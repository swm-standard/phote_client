'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import WorkbookIcon from '@/static/icons/workbook-icon';
import QuestionIcon from '@/static/icons/question-icon';
import ShareIcon from '@/static/icons/share-icon';
import ProfileIcon from '@/static/icons/profile-icon';

interface NavigationItem {
  path: string;
  buttonText: string;
  icon: React.ComponentType<{ className: string }>;
}

const navigationList: NavigationItem[] = [
  {
    path: 'workbook',
    buttonText: '문제집',
    icon: WorkbookIcon,
  },
  {
    path: 'question',
    buttonText: '문제',
    icon: QuestionIcon,
  },
  {
    path: 'share',
    buttonText: '공유',
    icon: ShareIcon,
  },
  {
    path: 'my',
    buttonText: '마이페이지',
    icon: ProfileIcon,
  },
];

const Navigation = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <ul className="flex w-full flex-row justify-between bg-white">
      {navigationList.map((item, idx) =>
        segment === item.path ? (
          <li
            key={idx}
            className="flex flex-col items-center justify-center gap-1 px-9 py-3 text-text-001"
          >
            <item.icon className="h-6 w-6" />
            <p className="text-xs">{item.buttonText}</p>
          </li>
        ) : (
          <Link href={item.path} key={idx}>
            <li className="text-text-003 flex flex-col items-center justify-center gap-1 px-9 py-3">
              <item.icon className="h-6 w-6" />
              <p className="text-xs">{item.buttonText}</p>
            </li>
          </Link>
        ),
      )}
    </ul>
  );
};

export default Navigation;
