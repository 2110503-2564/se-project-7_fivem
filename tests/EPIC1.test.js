import { test, expect } from '@playwright/test';

test('US1-1 (Create Campground) : AC1', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Manage Campground' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'admin' })).toBeVisible();
  await page.getByRole('link', { name: 'Manage Campground' }).click();
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('Made');
  await page.locator('input[name="address"]').click();
  await page.locator('input[name="address"]').fill('By');
  await page.locator('input[name="district"]').click();
  await page.locator('input[name="district"]').fill('Praywright');
  await page.locator('input[name="province"]').click();
  await page.locator('input[name="province"]').fill('Codegen');
  await page.locator('input[name="postalcode"]').click();
  await page.locator('input[name="postalcode"]').fill('55555');
  await page.locator('input[name="tel"]').click();
  await page.locator('input[name="tel"]').fill('027895478');
  await page.locator('input[name="price"]').click();
  await page.locator('input[name="price"]').fill('8888');
  await page.getByLabel('').click();
  await page.getByRole('option', { name: 'West' }).click();
  await page.getByRole('button', { name: 'Create Campground' }).click();
  await expect(page.getByText('Campground created')).toBeVisible();
  await page.getByRole('link', { name: 'Camping adventure CampGround' }).click();
  await page.getByRole('button', { name: 'Explore Campgrounds' }).click();
  await expect(page.getByRole('link', { name: 'Made By' })).toBeVisible();
  await page.getByRole('link', { name: 'Made By' }).click();
  await expect(page.getByRole('heading', { name: 'Made' })).toBeVisible();
  await expect(page.getByText('By')).toBeVisible();
  await expect(page.getByText('Praywright')).toBeVisible();
  await expect(page.getByText('Codegen')).toBeVisible();
  await expect(page.getByRole('link', { name: '027895478' })).toBeVisible();
  await expect(page.getByText('West')).toBeVisible();
  await expect(page.getByText('55555')).toBeVisible();
  await expect(page.getByText('฿')).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});


test('US1-1 (Create Campground) : AC2', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByRole('link', { name: 'Manage Campground' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'admin' })).toBeVisible();
  await page.getByRole('link', { name: 'Manage Campground' }).click();

  // Fill all fields once
  await page.locator('input[name="name"]').fill('Test');
  await page.locator('input[name="address"]').fill('US1');
  await page.locator('input[name="district"]').fill('1');
  await page.locator('input[name="province"]').fill('AC2');
  await page.locator('input[name="postalcode"]').fill('12345');
  await page.locator('input[name="tel"]').fill('022454545');
  await page.locator('input[name="price"]').fill('500');
  await page.getByLabel('').click();
  await page.getByRole('option', { name: 'South' }).click();

  await test.step('Name field is blank', async () => {
    await page.locator('input[name="name"]').fill('');
    await page.getByRole('button', { name: 'Create Campground' }).click();
    await expect(page.getByText('All fields are required')).toBeVisible();
    await page.locator('input[name="name"]').fill('Test');
  });

  await test.step('Address field is blank', async () => {
    await page.locator('input[name="address"]').fill('');
    await page.getByRole('button', { name: 'Create Campground' }).click();
    await expect(page.getByText('All fields are required')).toBeVisible();
    await page.locator('input[name="address"]').fill('US1');
  });

  await test.step('District field is blank', async () => {
    await page.locator('input[name="district"]').fill('');
    await page.getByRole('button', { name: 'Create Campground' }).click();
    await expect(page.getByText('All fields are required')).toBeVisible();
    await page.locator('input[name="district"]').fill('1');
  });

  await test.step('Province field is blank', async () => {
    await page.locator('input[name="province"]').fill('');
    await page.getByRole('button', { name: 'Create Campground' }).click();
    await expect(page.getByText('All fields are required')).toBeVisible();
    await page.locator('input[name="province"]').fill('AC2');
  });

  await test.step('Postal Code field is blank', async () => {
    await page.locator('input[name="postalcode"]').fill('');
    await page.getByRole('button', { name: 'Create Campground' }).click();
    await expect(page.getByText('All fields are required')).toBeVisible();
    await page.locator('input[name="postalcode"]').fill('12345');
  });

  await test.step('Telephone field is blank', async () => {
    await page.locator('input[name="tel"]').fill('');
    await page.getByRole('button', { name: 'Create Campground' }).click();
    await expect(page.getByText('All fields are required')).toBeVisible();
    await page.locator('input[name="tel"]').fill('022454545');
  });

  await test.step('Price field is blank', async () => {
    await page.locator('input[name="price"]').fill('');
    await page.getByRole('button', { name: 'Create Campground' }).click();
    await expect(page.getByText('All fields are required')).toBeVisible();
    await page.locator('input[name="price"]').fill('500');
  });

  await test.step('All fields are blank', async () => {
    await page.locator('input[name="name"]').fill('');
    await page.locator('input[name="address"]').fill('');
    await page.locator('input[name="district"]').fill('');
    await page.locator('input[name="province"]').fill('');
    await page.locator('input[name="postalcode"]').fill('');
    await page.locator('input[name="tel"]').fill('');
    await page.locator('input[name="price"]').fill('');
    await page.getByRole('button', { name: 'Create Campground' }).click();
    await expect(page.getByText('All fields are required')).toBeVisible();
  });

  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});





test('US1-2 (Update Campground): AC1', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Manage Campground' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'admin' })).toBeVisible();
  await page.getByRole('link', { name: 'Manage Campground' }).click();
  await page.locator('select').selectOption('manage');
  await page.getByRole('combobox').filter({ hasText: 'Select a campground' }).click();
  await page.getByRole('option', { name: 'Made' }).click();
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('Edit');
  await page.locator('input[name="address"]').click();
  await page.locator('input[name="address"]').fill('Byyyy');
  await page.locator('input[name="district"]').click();
  await page.locator('input[name="district"]').fill('Praywrighttttt');
  await page.locator('input[name="province"]').click();
  await page.locator('input[name="province"]').fill('Codegennnnn');
  await page.locator('input[name="postalcode"]').click();
  await page.locator('input[name="postalcode"]').fill('12457');
  await page.locator('input[name="tel"]').click();
  await page.locator('input[name="tel"]').fill('028887777');
  await page.locator('input[name="price"]').click();
  await page.locator('input[name="price"]').fill('3333');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Campground updated')).toBeVisible();
  await page.getByRole('link', { name: 'Camping adventure CampGround' }).click();
  await page.getByRole('button', { name: 'Explore Campgrounds' }).click();
  await expect(page.getByRole('link', { name: 'Edit Byyyy' })).toBeVisible();
  await page.getByRole('link', { name: 'Edit Byyyy' }).click();
  await expect(page.getByRole('heading', { name: 'Edit' })).toBeVisible();
  await expect(page.getByText('Byyyy')).toBeVisible();
  await expect(page.getByText('Praywrighttttt')).toBeVisible();
  await expect(page.getByText('Codegennnnn')).toBeVisible();
  await expect(page.getByRole('link', { name: '028887777' })).toBeVisible();
  await expect(page.getByText('West')).toBeVisible();
  await expect(page.getByText('12457')).toBeVisible();
  await expect(page.getByText('฿')).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});


test('US1-2 (Update Campground) : AC2', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByRole('link', { name: 'Manage Campground' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'admin' })).toBeVisible();
  await page.getByRole('link', { name: 'Manage Campground' }).click();

  await page.locator('select').selectOption('manage');
  await page.getByRole('combobox').filter({ hasText: 'Select a campground' }).click();
  await page.getByRole('option', { name: 'Edit' }).click();

  // Fill normally once
  await page.locator('input[name="name"]').fill('Test');
  await page.locator('input[name="address"]').fill('US1');
  await page.locator('input[name="district"]').fill('2');
  await page.locator('input[name="province"]').fill('AC2');
  await page.locator('input[name="postalcode"]').fill('12345');
  await page.locator('input[name="tel"]').fill('022454545');
  await page.locator('input[name="price"]').fill('500');

  await test.step('Name field is blank', async () => {
    await page.locator('input[name="name"]').fill('');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Failed to update campground')).toBeVisible();
    await page.locator('input[name="name"]').fill('Test');
  });

  await test.step('Address field is blank', async () => {
    await page.locator('input[name="address"]').fill('');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Failed to update campground')).toBeVisible();
    await page.locator('input[name="address"]').fill('US1');
  });

  await test.step('District field is blank', async () => {
    await page.locator('input[name="district"]').fill('');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Failed to update campground')).toBeVisible();
    await page.locator('input[name="district"]').fill('2');
  });

  await test.step('Province field is blank', async () => {
    await page.locator('input[name="province"]').fill('');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Failed to update campground')).toBeVisible();
    await page.locator('input[name="province"]').fill('AC2');
  });

  await test.step('Postal Code field is blank', async () => {
    await page.locator('input[name="postalcode"]').fill('');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Failed to update campground')).toBeVisible();
    await page.locator('input[name="postalcode"]').fill('12345');
  });

  await test.step('Telephone field is blank', async () => {
    await page.locator('input[name="tel"]').fill('');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Failed to update campground')).toBeVisible();
    await page.locator('input[name="tel"]').fill('022454545');
  });

  await test.step('Price field is blank', async () => {
    await page.locator('input[name="price"]').fill('');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Failed to update campground')).toBeVisible();
    await page.locator('input[name="price"]').fill('500');
  });

  await test.step('All fields are blank', async () => {
    await page.locator('input[name="name"]').fill('');
    await page.locator('input[name="address"]').fill('');
    await page.locator('input[name="district"]').fill('');
    await page.locator('input[name="province"]').fill('');
    await page.locator('input[name="postalcode"]').fill('');
    await page.locator('input[name="tel"]').fill('');
    await page.locator('input[name="price"]').fill('');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Failed to update campground')).toBeVisible();
  });

  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});



test('US1-3 (Delete Campground) : AC1', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Manage Campground' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'admin' })).toBeVisible();
  await page.getByRole('link', { name: 'Manage Campground' }).click();
  await page.locator('select').selectOption('manage');
  await page.getByRole('combobox').filter({ hasText: 'Select a campground' }).click();
  await page.getByRole('option', { name: 'Edit' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Campground deleted')).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('main').getByRole('button', { name: 'Sign Out' }).click();
});


test('US1-3 (Delete Campground) : AC2', async ({ page }) => {
  await page.goto('http://localhost:3000/managecampground');
  await page.locator('select').selectOption('manage');
  await page.getByText('Select a campground').click();
  await page.getByRole('option', { name: 'ForTestCase' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Please select a campground to')).toBeVisible();
});

test('US1-4 (View All Campgrounds) : AC1', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).click();
  await page.getByRole('textbox', { name: 'john@example.com' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('12345678');
  await page.getByRole('main').getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Manage Campground' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'admin' })).toBeVisible();
  await page.getByRole('link', { name: 'Manage Campground' }).click();
  await page.locator('select').selectOption('viewc');
  await expect(page.getByRole('heading', { name: 'Campground Directory' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Campground' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Location' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Region' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Price' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Actions' })).toBeVisible();
});


test('US1-4 (View All Campgrounds) : AC2', async ({ page }) => {
  await page.goto('http://localhost:3000/managecampground');
  await page.locator('select').selectOption('viewc');
  await expect(page.getByRole('heading', { name: 'Unauthorized' })).toBeVisible();
  await expect(page.getByText('You are not authorized to')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Go Back Home' })).toBeVisible();
});