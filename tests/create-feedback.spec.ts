import { Feedback } from '@core/models';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/#/suggestions');

  await page.goto('http://localhost:4200/#/feedback/create');
});

const FEEDBACK: Partial<Feedback> = {
  id: 1,
  title: 'Create test feedback',
  category: 'feature',
  upvotes: 0,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta pretium mauris, a varius eros ultrices a.',
  status: 'suggestion',
};

test.describe('Create feedback', () => {
  test('should create feedback', async ({ page }) => {
    const title = page.getByLabel('Feedback Title');

    const description = page.getByLabel('Feedback Detail');

    await title.fill(FEEDBACK.title ?? '');

    await description.fill(FEEDBACK.description ?? '');

    await page.getByRole('button', { name: 'Add Feedback' }).click();

    await page.waitForURL('**/suggestions');
  });

  test('should be disabled', async ({ page }) => {
    const title = page.getByLabel('Feedback Title');

    const btn = page.getByRole('button', { name: 'Add Feedback' });

    await title.fill(FEEDBACK.title ?? '');

    const error = page.getByText("Can't be empty");

    await expect(btn).toHaveAttribute('disabled', '');

    expect(error).toBeTruthy();
  });

  test('should clear form', async ({ page }) => {
    const title = page.getByLabel('Feedback Title');

    const description = page.getByLabel('Feedback Detail');

    await title.fill(FEEDBACK.title ?? '');

    await description.fill(FEEDBACK.description ?? '');

    const btn = page.getByRole('button', { name: 'Cancel' });

    await btn.click();

    const errors = await page.locator('.form__error-msg').all();

    expect(errors?.length ?? 0).toBe(2);
  });
});
