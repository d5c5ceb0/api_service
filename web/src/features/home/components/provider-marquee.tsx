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
import { getLobeIcon } from '@/lib/lobe-icon'

import { PROVIDER_ICONS } from '../constants'

interface ProviderMarqueeProps {
  className?: string
}

export function ProviderMarquee(props: ProviderMarqueeProps) {
  // Duplicate the list once for a seamless translateX(-50%) loop
  const icons = [...PROVIDER_ICONS, ...PROVIDER_ICONS]
  const half = PROVIDER_ICONS.length

  return (
    <div
      className={`marquee-container relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] ${props.className ?? ''}`}
    >
      <div className='animate-marquee flex w-max items-center'>
        {icons.map((name, i) => (
          <div
            key={i < half ? name : `${name}-echo`}
            aria-hidden={i >= half}
            className='text-foreground/50 hover:text-foreground flex items-center justify-center px-6 transition-colors'
          >
            {getLobeIcon(name, 30)}
          </div>
        ))}
      </div>
    </div>
  )
}
