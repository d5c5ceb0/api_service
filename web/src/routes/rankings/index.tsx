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
import { createFileRoute, redirect } from '@tanstack/react-router'

// Creem compliance: the rankings page is retired. An empty leaderboard looks
// unfinished and fabricated charts would be false information, so any visit
// is redirected to the home page. The module is also hidden from the nav by
// default (rankings.enabled = false in nav-modules.ts).
export const Route = createFileRoute('/rankings/')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})
