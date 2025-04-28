import { test, expect } from "@playwright/test";

test("US2-1 (Create Payment) : AC1", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "john@example.com" }).click();
  await page
    .getByRole("textbox", { name: "john@example.com" })
    .fill("abc@gmail.com");
  await page.getByRole("textbox", { name: "••••••••" }).click();
  await page.getByRole("textbox", { name: "••••••••" }).fill("123456");
  await page.getByRole("main").getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "abc" }).click();
  await page.getByRole("button", { name: "Payment Method" }).click();
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Credit Card" }).click();
  await page.getByRole("textbox", { name: "Enter card number" }).click();
  await page
    .getByRole("textbox", { name: "Enter card number" })
    .fill("1111111111111");
  await page.getByRole("textbox", { name: "Enter payment name" }).click();
  await page.getByRole("textbox", { name: "Enter payment name" }).fill("card");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page
    .getByRole("main")
    .getByRole("button", { name: "Sign Out" })
    .click();
});

test("US2-1 (Create Payment) : AC2", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "john@example.com" }).click();
  await page
    .getByRole("textbox", { name: "john@example.com" })
    .fill("abc@gmail.com");
  await page.getByRole("textbox", { name: "••••••••" }).click();
  await page.getByRole("textbox", { name: "••••••••" }).fill("123456");
  await page.getByRole("main").getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "abc" }).click();
  await page.getByRole("button", { name: "Payment Method" }).click();
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Credit Card" }).click();
  await page.getByRole("textbox", { name: "Enter payment name" }).fill("c");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("textbox", { name: "Enter card number" }).fill("123123");
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page
    .getByRole("main")
    .getByRole("button", { name: "Sign Out" })
    .click();
});

test("US2-2 (Update Payment) : AC1", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "john@example.com" }).click();
  await page
    .getByRole("textbox", { name: "john@example.com" })
    .fill("abc@gmail.com");
  await page.getByRole("textbox", { name: "••••••••" }).click();
  await page.getByRole("textbox", { name: "••••••••" }).fill("123456");
  await page.getByRole("main").getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "abc" }).click();
  await page.getByRole("button", { name: "Payment Method" }).click();
  await page.getByRole("button", { name: "Manage Payment Method" }).click();
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select a payment method" })
    .click();
  await page.getByRole("option", { name: "card" }).click();
  await page.getByRole("textbox", { name: "Card Number" }).click();
  await page
    .getByRole("textbox", { name: "Card Number" })
    .fill("1234567890123");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText("Payment method updated")).toBeVisible();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page
    .getByRole("main")
    .getByRole("button", { name: "Sign Out" })
    .click();
});

test("US2-2 (Update Payment) : AC2", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "john@example.com" }).click();
  await page
    .getByRole("textbox", { name: "john@example.com" })
    .fill("abc@gmail.com");
  await page.getByRole("textbox", { name: "••••••••" }).click();
  await page.getByRole("textbox", { name: "••••••••" }).fill("123456");
  await page.getByRole("main").getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "abc" }).click();
  await page.getByRole("button", { name: "Payment Method" }).click();
  await page.getByRole("button", { name: "Manage Payment Method" }).click();
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select a payment method" })
    .click();
  await page.getByRole("option", { name: "card" }).click();
  await page.getByRole("textbox", { name: "Card Number" }).click();
  await page.getByRole("textbox", { name: "Card Number" }).fill("123");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText("Failed to update payment")).toBeVisible();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page
    .getByRole("main")
    .getByRole("button", { name: "Sign Out" })
    .click();
});

test("US2-3 (Delete Payment) : AC1", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "john@example.com" }).click();
  await page
    .getByRole("textbox", { name: "john@example.com" })
    .fill("abc@gmail.com");
  await page.getByRole("textbox", { name: "••••••••" }).click();
  await page.getByRole("textbox", { name: "••••••••" }).fill("123456");
  await page.getByRole("main").getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "abc" }).click();
  await page.getByRole("button", { name: "Payment Method" }).click();
  await page.getByRole("button", { name: "Manage Payment Method" }).click();
  await page
    .getByRole("combobox")
    .filter({ hasText: "Select a payment method" })
    .click();
  await page.getByRole("option", { name: "card" }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText("Payment method deleted")).toBeVisible();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page
    .getByRole("main")
    .getByRole("button", { name: "Sign Out" })
    .click();
});

test("US2-3 (Delete Payment) : AC2", async ({ page }) => {
  await page.goto("http://localhost:3000/userinfo");
  await expect(page.getByText("Welcome BackSign")).toBeVisible();
});

test("US2-4 (View Payment History) : AC1", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("textbox", { name: "john@example.com" }).click();
  await page
    .getByRole("textbox", { name: "john@example.com" })
    .fill("abc@gmail.com");
  await page.getByRole("textbox", { name: "••••••••" }).click();
  await page.getByRole("textbox", { name: "••••••••" }).fill("123456");
  await page.getByRole("main").getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "abc" }).click();
  await page.getByRole("button", { name: "Transactions" }).click();
  await expect(
    page.getByRole("cell", { name: "680f3118bb8c5e0356c61483" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Sign Out" }).click();
  await page
    .getByRole("main")
    .getByRole("button", { name: "Sign Out" })
    .click();
});

test("US2-4 (View Payment History) : AC2", async ({ page }) => {
  await page.goto("http://localhost:3000/api/auth/signin");
  await expect(page.getByText("Sign in to your camping")).toBeVisible();
});
