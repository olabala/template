import { configure, use, run } from 'system'

import logger from 'modules/logger'
{{#persist}}
import persist from 'modules/persist'
{{/persist}}
{{#request}}
import request from 'modules/request'
{{/request}}
{{#i18n}}
import i18n from 'modules/i18n'
{{/i18n}}
{{#validator}}
import validator from 'modules/validator'
{{/validator}}
{{#core}}
import core from 'modules/core'
{{/core}}

import Root from './views/root'

/**
 * 全局配置
 */
configure({
  // 项目名称
  name: '{{ name }}',
  // 项目版本号
  version: '{{ version }}',
  // 系统自动将 component 挂载到 element
  element: '#app',
  component: Root
})

/**
 * Use Modules
 */

/**
 * 调试相关
 */
__DEV__ && use(logger)

/**
 * 被依赖的模块，移除可能会影响部分功能
 */
{{#request}}
use(request)
{{/request}}
{{#i18n}}
use(i18n)
{{/i18n}}
{{#validator}}
use(validator)
{{/validator}}

/**
 * 普通模块
 */
// use(xxx, { prefix: 'xxx' })
// use(yyy, { prefix: 'yyy' })
// use(zzz, { prefix: 'zzz' })

/**
 * 核心模块
 */
{{#core}}
use(core)
{{/core}}
{{#persist}}
use(persist)
{{/persist}}

/**
 * Run Modules
 */

run(({ router }) => {
  __PROD__ || console.log('%c[PLATO] %cLet\'s go!',
    'font-weight: bold', 'color: green; font-weight: bold')

  /**
   * Let's go!
   */
  {{#mobile}}
  router.afterEach(() => {
    // 解决 iOS 焦点 BUG
    const activeElement = document.activeElement
    if (activeElement && activeElement.nodeName !== 'BODY') {
      activeElement.blur()
    }
  })
  {{/mobile}}
})
