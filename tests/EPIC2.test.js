import { test, expect } from "@playwright/test";

test("US2-1 (Create Payment) : AC1", async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('abc@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('123456');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'abc' }).click();
  await page.getByRole('button', { name: 'Payment Method' }).click();
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Credit Card' }).click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).fill('card');
  await page.getByRole('textbox', { name: 'Enter card number' }).click();
  await page.getByRole('textbox', { name: 'Enter card number' }).fill('1111111111111');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Bank Account' }).click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).fill('bank');
  await page.getByRole('textbox', { name: 'Enter bank account number' }).fill('9999999999');
  await page.getByText('Select bank').click();
  await page.getByRole('option', { name: 'KBank' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});

test("US2-1 (Create Payment) : AC2", async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('abc@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('123456');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'abc' }).click();
  await page.getByRole('button', { name: 'Payment Method' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Credit Card' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).fill('card');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).dblclick();
  await page.getByRole('textbox', { name: 'Enter payment name' }).fill('');
  await page.getByRole('textbox', { name: 'Enter card number' }).click();
  await page.getByRole('textbox', { name: 'Enter card number' }).fill('1111111111112');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Credit Card').click();
  await page.getByRole('option', { name: 'Bank Account' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('combobox', { name: 'Select bank' }).click();
  await page.getByRole('option', { name: 'KBank' }).click();
  await page.getByRole('textbox', { name: 'Enter bank account number' }).click();
  await page.getByRole('textbox', { name: 'Enter bank account number' }).fill('9999999990');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('combobox', { name: 'KBank' }).click();
  await page.getByText('Select bank').click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).fill('bank');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Enter bank account number' }).click();
  await page.getByRole('textbox', { name: 'Enter bank account number' }).fill('');
  await page.getByRole('combobox', { name: 'Select bank' }).click();
  await page.getByRole('option', { name: 'KBank' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});

test("US2-2 (Update Payment) : AC1", async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('abc@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('123456');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'abc' }).click();
  await page.getByRole('button', { name: 'Payment Method' }).click();
  await page.getByRole('button', { name: 'Manage Payment Method' }).click();
  await page.getByText('Select a payment method').click();
  await page.getByRole('option', { name: 'card' }).click();
  await page.getByRole('textbox', { name: 'Card Number' }).click();
  await page.getByRole('textbox', { name: 'Card Number' }).fill('1234567890123');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Payment method updated')).toBeVisible();
  await page.getByText('card', { exact: true }).click();
  await page.getByRole('option', { name: 'bank' }).click();
  await page.getByRole('textbox', { name: 'Account Number' }).click();
  await page.getByRole('textbox', { name: 'Account Number' }).fill('1234567899');
  await page.locator('select[name="bankName"]').selectOption('SCB');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Payment method updated')).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});

test("US2-2 (Update Payment) : AC2", async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('abc@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('123456');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'abc' }).click();
  await page.getByRole('button', { name: 'Payment Method' }).click();
  await page.getByRole('button', { name: 'Manage Payment Method' }).click();
  await page.getByText('Select a payment method').click();
  await page.getByRole('option', { name: 'card' }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Card number is required for')).toBeVisible();
  await page.getByRole('textbox', { name: 'Payment Method Name' }).click();
  await page.getByRole('textbox', { name: 'Payment Method Name' }).fill('');
  await page.getByRole('textbox', { name: 'Card Number' }).click();
  await page.getByRole('textbox', { name: 'Card Number' }).fill('123123');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Please fill out all required')).toBeVisible();
  await page.getByText('card', { exact: true }).click();
  await page.getByRole('option', { name: 'bank' }).click();
  await page.locator('select[name="bankName"]').selectOption('SCB');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Bank name and account number')).toBeVisible();
  await page.getByRole('textbox', { name: 'Account Number' }).click();
  await page.getByRole('textbox', { name: 'Account Number' }).fill('1234567899');
  await page.getByRole('textbox', { name: 'Payment Method Name' }).click();
  await page.getByRole('textbox', { name: 'Payment Method Name' }).fill('');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Please fill out all required')).toBeVisible();
  await page.getByRole('textbox', { name: 'Account Number' }).click();
  await page.getByRole('textbox', { name: 'Account Number' }).fill('23');
  await page.getByRole('textbox', { name: 'Payment Method Name' }).click();
  await page.getByRole('textbox', { name: 'Payment Method Name' }).fill('bank');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Failed to update payment')).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});

test("US2-3 (Delete Payment) : AC1", async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('abc@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('123456');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'abc' }).click();
  await page.getByRole('button', { name: 'Payment Method' }).click();
  await page.getByRole('button', { name: 'Manage Payment Method' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Select a payment method' }).click();
  await page.getByRole('option', { name: 'card' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Payment method deleted')).toBeVisible();
  await page.getByText('Select a payment method').click();
  await page.getByRole('option', { name: 'bank' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Payment method deleted')).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});

test("US2-3 (Delete Payment) : AC2", async ({ page }) => {
  await page.goto("http://localhost:3000/userinfo");
  await expect(page.getByText("Welcome BackSign")).toBeVisible();
});

test("US2-4 (View Payment History) : AC1", async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('abc@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('123456');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'abc' }).click();
  await page.getByRole('button', { name: 'Transactions' }).click();
  await expect(page.getByRole('cell', { name: 'User' })).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});

test("US2-4 (View Payment History) : AC2", async ({ page }) => {
  await page.goto("http://localhost:3000/api/auth/signin");
  await expect(page.getByText("Sign in to your camping")).toBeVisible();
});
