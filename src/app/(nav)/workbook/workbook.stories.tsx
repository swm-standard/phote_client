import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse, delay } from 'msw';
import { BASE_URL } from '@/app/constants';
import { Dummy_Workbooks } from '@/app/dummy';
import Page from './page';

const meta = {
  title: 'Workbook',
  component: Page,
  decorators: [
    (Story) => (
      <div className="w-[430px] h-[932px] bg-white relative">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbooks`, () => {
          return HttpResponse.json(Dummy_Workbooks);
        }),
        http.post(`${BASE_URL}/workbook`, () => {
          return HttpResponse.json({
            result: 'SUCCESS',
            status: 200,
          });
        }),
      ],
    },
  },
};

export const FailReadingWorkbooks: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbooks`, async () => {
          await delay(1000);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};

export const FailCreatingWorkbooks: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${BASE_URL}/workbooks`, () => {
          return HttpResponse.json(Dummy_Workbooks);
        }),
        http.post(`${BASE_URL}/workbook`, () => {
          return new HttpResponse(null, {
            status: 500,
          });
        }),
      ],
    },
  },
};