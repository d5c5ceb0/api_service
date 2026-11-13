/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import type { SVGProps } from 'react'

import { cn } from '@/lib/utils'

export function ZkpLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id='zkp-logo'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('size-6', className)}
      {...props}
    >
      <title>ZKP</title>
      {/* Hexagon shell */}
      <path d='M12 3 19.8 7.5v9L12 21 4.2 16.5v-9Z' />
      {/* Spokes from the central hub to alternating vertices */}
      <path d='M12 12V3M12 12l6.9 4.5M12 12l-6.9 4.5' strokeWidth='1.5' />
      {/* Central hub node */}
      <circle cx='12' cy='12' r='2.2' fill='currentColor' stroke='none' />
    </svg>
  )
}
