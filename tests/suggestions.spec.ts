import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('localhost:4200');
});

test.describe('Static Content', () => {
  test('Test static content', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Frontend Mentor' });

    const subheading = page.getByText('Feedback Board');

    const roadmap = page.getByText('Roadmap');

    const link = page.getByRole('link', { name: 'View', exact: true });

    const addFeedback = page.getByRole('button', { name: 'Add Feedback' });

    expect(heading).toBeTruthy();
    expect(subheading).toBeTruthy();
    expect(roadmap).toBeTruthy();
    expect(link).toBeTruthy();
    expect(addFeedback).toBeTruthy();
  });
});

test.describe('Filter suggestions', () => {
  test('shoud filter suggestions', async ({ page }) => {
    const filter = page.getByRole('button', { name: 'enhancement' });

    await filter.click();

    const links = await page.locator('ul.suggestions__list > *').all();

    expect(links.length).toBe(2);
  });
});

test.describe('Sort suggestions', () => {
  test('shoud sort suggestions', async ({ page }) => {
    const sortBy = page.getByRole('button').getByText('Sort by: ');

    await sortBy.click();

    const leastUpvotes = page.getByRole('button', {
      name: 'least upvotes',
      exact: true,
    });

    await leastUpvotes.click();
  });
});

test.describe('Navigations', () => {
  test('Navigate to roadmap', async ({ page }) => {
    await page.getByRole('link', { name: 'View', exact: true }).click();

    await page.waitForURL('**/roadmap');
  });

  test('Navigate to create feedback', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Feedback' }).click();

    await page.waitForURL('**/feedback/create');
  });

  test('Navigate to feedback edit', async ({ page }) => {
    const link = page.getByRole('link').getByText('Add tags for solutions');

    await link.click();

    await page.waitForURL('**/edit');
  });
});
