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
import { describe, expect, test } from 'vitest'

import en from '@/i18n/locales/en.json'
import zh from '@/i18n/locales/zh.json'

import { HOME_I18N_KEYS } from '../i18n-keys'

// Every key introduced by the ZKP home page must be registered in both the
// English base locale and the fully translated Chinese locale; the remaining
// locales fall back to English.
describe('ZKP home page i18n coverage', () => {
  test('every key exists in the English locale', () => {
    for (const key of HOME_I18N_KEYS) {
      expect(en.translation, `missing en key: ${key}`).toHaveProperty(key)
      expect(
        en.translation[key as keyof typeof en.translation],
        `empty en value: ${key}`
      ).toBeTruthy()
    }
  })

  test('every key has a non-empty Chinese translation', () => {
    for (const key of HOME_I18N_KEYS) {
      expect(zh.translation, `missing zh key: ${key}`).toHaveProperty(key)
      expect(
        zh.translation[key as keyof typeof zh.translation],
        `empty zh value: ${key}`
      ).toBeTruthy()
    }
  })
})
