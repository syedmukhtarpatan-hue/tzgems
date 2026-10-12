import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { products } from "../../src/content/products";
import { mkdir } from "node:fs/promises";
const mainRoutes = [
  "/",
  "/gemstones/",
  "/our-story/",
  "/events/",
  "/contact/",
  "/privacy-policy/",
];
const productRoute = "/gemstones/emerald-cut/";
const routes = [...mainRoutes, ...products.map((p) => `/gemstones/${p.slug}/`)];
for (const route of routes) {
  test(`route, SEO and images: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.{30,}/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://tz-gems-editorial.syedmukhtar-patan.chatgpt.site${route}`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
    await page.evaluate(async () => {
      await Promise.all(
        [...document.images].map((image) => {
          image.loading = "eager";
          return image.decode().catch(() => {});
        }),
      );
    });
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (i) =>
              (i as HTMLImageElement).naturalWidth > 0 && i.getAttribute("alt"),
          ),
        ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}
for (const width of [360, 390, 768, 1024, 1440]) {
  for (const route of [...mainRoutes, productRoute]) {
    test(`responsive ${width}px ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].map((image) => {
            image.loading = "eager";
            return image.decode().catch(() => {});
          }),
        );
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator(".product-card")
          .evaluateAll((cards) =>
            cards.every((card) => card.getBoundingClientRect().width >= 140),
          ),
      ).toBe(true);
      const slug =
        route === "/" ? "home" : route.split("/").filter(Boolean).join("-");
      if (width === 390 || width === 1440) {
        await mkdir("outputs/screenshots", { recursive: true });
        await page.screenshot({
          path: `outputs/screenshots/${slug}-${width}.png`,
          fullPage: true,
        });
      }
    });
  }
}
test("filters, search, sorting, history, reload and pagination", async ({
  page,
}) => {
  await page.goto("/gemstones/");
  const status = page.locator('.collection-result-line [role="status"]');
  await expect(status).toHaveText("9 gemstones");
  await page.getByRole("searchbox", { name: "Search gemstones" }).fill("oval");
  await expect(status).toHaveText("1 gemstone");
  await page
    .getByRole("combobox", { name: "Stone type", exact: true })
    .selectOption("rough");
  await expect(status).toHaveText("0 gemstones");
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await expect(status).toHaveText("9 gemstones");
  await page
    .getByRole("combobox", { name: "Stone type", exact: true })
    .selectOption("cut-polished");
  await page
    .getByRole("combobox", { name: "Colour", exact: true })
    .selectOption("blue-violet");
  await page
    .getByRole("combobox", { name: "Shape", exact: true })
    .selectOption("Emerald");
  await page
    .getByRole("combobox", { name: "Availability", exact: true })
    .selectOption("demonstration");
  await page
    .getByRole("combobox", { name: "Sort by", exact: true })
    .selectOption("name");
  await expect(status).toHaveText("1 gemstone");
  await page.reload();
  await expect(status).toHaveText("1 gemstone");
  await expect(page.locator(".catalogue-grid h3")).toHaveText(
    "Tanzanite – Emerald Cut",
  );
  await page
    .getByRole("combobox", { name: "Treatment", exact: true })
    .selectOption("unheated");
  await expect(status).toHaveText("0 gemstones");
  await page.goBack();
  await expect(status).toHaveText("1 gemstone");
  await page.getByRole("button", { name: "Clear all", exact: true }).click();
  await expect(status).toHaveText("9 gemstones");
  await page
    .getByRole("combobox", { name: "Carat weight", exact: true })
    .selectOption("5-plus");
  await expect(status).toHaveText("0 gemstones");
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Gemstones per page" })
    .selectOption("6");
  await expect(page.locator(".catalogue-grid .product-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  await expect(page.locator(".catalogue-grid .product-card")).toHaveCount(3);
  await expect(page).toHaveURL(/page=2/);
  await page.reload();
  await expect(page.locator(".catalogue-grid .product-card")).toHaveCount(3);
  await page
    .getByRole("button", { name: "Previous page", exact: true })
    .click();
  await expect(page.locator(".catalogue-grid .product-card")).toHaveCount(6);
});
test("product enquiry includes reference and URL; clipboard, focus and gallery work", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(productRoute);
  const trigger = page.getByRole("button", {
    name: "Enquire on WhatsApp about Tanzanite – Emerald Cut (DEMO-001)",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Let’s talk Tanzanite." });
  await expect(dialog).toBeVisible();
  const field = page.getByRole("textbox", { name: "Your prepared enquiry" });
  await expect(field).toHaveValue(
    /DEMO-001[\s\S]*https:\/\/.*\/gemstones\/emerald-cut\//,
  );
  await expect(
    page.getByRole("button", { name: "Close enquiry" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("link", { name: "Visit Instagram" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Copy enquiry", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText(
    "Enquiry copied. No message has been sent.",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "DEMO-001",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page
    .getByRole("button", { name: "View enlarged facet detail" })
    .click();
  await expect(page.locator(".gallery-main")).toHaveClass(/detail-view/);
  await page
    .getByRole("button", { name: "Enlarge Tanzanite – Emerald Cut" })
    .click();
  await expect(
    page.getByRole("dialog", {
      name: "Tanzanite – Emerald Cut enlarged image",
    }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Enlarge Tanzanite – Emerald Cut" }),
  ).toBeFocused();
  await page.getByRole("tab", { name: "Description", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Certification", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "No gemological report",
  );
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText("delivery");
  await page.getByRole("link", { name: "Request More Information" }).click();
  await expect(page).toHaveURL(/contact\/\?product=DEMO-001/);
  await page
    .getByRole("button", {
      name: /Enquire on WhatsApp about Tanzanite – Emerald Cut/,
    })
    .click();
  await expect(field).toHaveValue(/DEMO-001/);
});
test("clipboard refusal leaves selectable text and honest guidance", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("Permission denied");
        },
      },
    }),
  );
  await page.goto("/contact/");
  await page
    .getByRole("button", { name: "Prepare an Enquiry", exact: true })
    .click();
  await page.getByRole("button", { name: "Copy enquiry", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText(
    "Select and copy the message above. No message has been sent.",
  );
  await expect(
    page.getByRole("textbox", { name: "Your prepared enquiry" }),
  ).toBeFocused();
});
test("mobile menu closes with Escape and route navigation; touch filters work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Our Story", exact: true }).click();
  await expect(page).toHaveURL(/\/our-story\/$/);
  await expect(dialog).not.toBeVisible();
  await page.goto("/gemstones/?category=crystals");
  await expect(page.locator(".catalogue-grid .product-card")).toHaveCount(1);
  await page.getByRole("button", { name: /^Filters/ }).click();
  await expect(
    page.getByRole("combobox", { name: "Stone type", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Stone type", exact: true })
    .selectOption("rough");
  await expect(page.locator(".catalogue-grid h3")).toHaveText(
    "Rough Tanzanite",
  );
});
test("client carousel supports arrows, keyboard and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const track = page.locator(".carousel-track");
  await track.scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Next client photograph" }).click();
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(100);
  await track.press("ArrowLeft");
  await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBe(0);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
test("carousel supports touch dragging", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  const track = page.locator(".carousel-track");
  await track.scrollIntoViewIfNeeded();
  const box = await track.boundingBox();
  expect(box).not.toBeNull();
  const client = await context.newCDPSession(page);
  const y = box!.y + 100;
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 340, y }],
  });
  for (let x = 320; x >= 60; x -= 40)
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y }],
    });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(60);
  await context.close();
});
test("all homepage navigation, categories and product links resolve", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const links = await page
    .locator('a[href^="/"]')
    .evaluateAll((anchors) => [
      ...new Set(anchors.map((a) => a.getAttribute("href")!)),
    ]);
  for (const href of links)
    expect((await request.get(href)).status(), href).toBe(200);
});
test("404 and indexing safeguards", async ({ page, request }) => {
  const response = await page.goto("/not-an-inventory-item/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "A different path to something rare." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore Collection", exact: true })
    .click();
  await expect(page).toHaveURL(/\/gemstones\/$/);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "<loc>",
  );
});
for (const route of [...mainRoutes, productRoute]) {
  test(`WCAG automated checks: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
}
test("mobile menu and enquiry dialog accessibility", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.goto(productRoute);
  await page
    .getByRole("button", {
      name: "Enquire on WhatsApp about Tanzanite – Emerald Cut (DEMO-001)",
      exact: true,
    })
    .click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
