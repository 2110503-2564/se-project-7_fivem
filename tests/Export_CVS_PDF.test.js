import { test, expect } from "@playwright/test";

test("admin export csv and pdf", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "john@example.com" }).click();
  await page
    .getByRole("textbox", { name: "john@example.com" })
    .fill("admin@gmail.com");
  await page.getByRole("textbox", { name: "••••••••" }).click();
  await page.getByRole("textbox", { name: "••••••••" }).fill("12345678");
  await page.getByRole("main").getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByRole("button", { name: "admin" })).toBeVisible();
  await page.getByRole("button", { name: "admin" }).click();
  await page.getByRole("button", { name: "Transactions" }).click();
  await expect(
    page.getByRole("button", { name: "Download CSV" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Download PDF" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page
    .getByRole("main")
    .getByRole("button", { name: "Sign Out" })
    .click();
});

test("user export csv and pdf", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "john@example.com" }).click();
  await page
    .getByRole("textbox", { name: "john@example.com" })
    .fill("user8@gmail.com");
  await page.getByRole("textbox", { name: "••••••••" }).click();
  await page.getByRole("textbox", { name: "••••••••" }).fill("12345678");
  await page.getByRole("main").getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByRole("button", { name: "user 8" })).toBeVisible();
  await page.getByRole("button", { name: "user 8" }).click();
  await page.getByRole("button", { name: "Transactions" }).click();
  await expect(
    page.getByRole("button", { name: "Download CSV" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Download PDF" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page
    .getByRole("main")
    .getByRole("button", { name: "Sign Out" })
    .click();
});
