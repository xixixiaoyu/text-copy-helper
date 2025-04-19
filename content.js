/**
 * QuickCopy - 轻量级文本选择复制工具
 */
;(function () {
  // 统一配置管理
  const CONFIG = {
    buttonId: 'quick-copy-button',
    transitionDuration: 1000, // 状态消息显示时长(毫秒)
    scrollDebounce: 100, // 滚动防抖时间(毫秒)
    offset: { x: 10, y: 15 }, // 按钮相对鼠标的偏移
    labels: {
      copy: '复制',
      copied: '已复制',
      error: '失败',
    },
  }

  class QuickCopyButton {
    constructor() {
      this.button = null

      // 预绑定事件处理函数，便于后续移除
      this.boundHandleMouseUp = this.handleMouseUp.bind(this)
      this.boundHandleMouseDown = this.handleMouseDown.bind(this)
      this.boundHandleClick = this.handleClick.bind(this)
      this.debouncedHide = this.debounce(this.hide.bind(this), CONFIG.scrollDebounce)

      this.init()
    }

    /**
     * 初始化复制按钮和事件监听
     */
    init() {
      this.createButton()
      this.setupEventListeners()
    }

    /**
     * 创建复制按钮元素
     */
    createButton() {
      this.button = document.createElement('div')
      this.button.id = CONFIG.buttonId
      this.button.textContent = CONFIG.labels.copy
      this.button.style.display = 'none'
      document.body.appendChild(this.button)
      this.button.addEventListener('click', this.boundHandleClick)
    }

    /**
     * 处理按钮点击事件
     */
    handleClick(e) {
      e.stopPropagation()
      const selectedText = window.getSelection().toString().trim()
      if (!selectedText) return

      this.copyToClipboard(selectedText)
    }

    /**
     * 复制文本到剪贴板
     */
    copyToClipboard(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.updateButtonState(true)
        })
        .catch(err => {
          console.error('复制失败:', err)
          this.updateButtonState(false)
        })
    }

    /**
     * 更新按钮状态
     */
    updateButtonState(success) {
      if (success) {
        this.button.textContent = CONFIG.labels.copied
        this.button.classList.add('copied')
      } else {
        this.button.textContent = CONFIG.labels.error
        this.button.classList.add('error')
      }

      setTimeout(() => {
        this.button.textContent = CONFIG.labels.copy
        this.button.classList.remove('copied', 'error')
        this.hide()
      }, CONFIG.transitionDuration)
    }

    /**
     * 在鼠标位置显示按钮
     */
    show(selection, event) {
      const selectedText = selection.toString().trim()
      if (!selectedText) {
        this.hide()
        return
      }

      // 计算位置并考虑偏移量
      let buttonTop = event.pageY + CONFIG.offset.y
      let buttonLeft = event.pageX + CONFIG.offset.x

      // 边界检查，防止按钮超出视窗
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const buttonWidth = this.button.offsetWidth || 50 // 首次获取可能为0，提供默认值
      const buttonHeight = this.button.offsetHeight || 30

      // 防止超出右侧边界
      if (buttonLeft + buttonWidth > viewportWidth + window.scrollX) {
        buttonLeft = viewportWidth + window.scrollX - buttonWidth - 10
      }

      // 防止超出底部边界
      if (buttonTop + buttonHeight > viewportHeight + window.scrollY) {
        buttonTop = event.pageY - buttonHeight - 10 // 改为显示在鼠标上方
      }

      this.button.style.top = `${buttonTop}px`
      this.button.style.left = `${buttonLeft}px`
      this.button.style.display = 'block'
    }

    /**
     * 隐藏按钮
     */
    hide() {
      if (this.button) {
        this.button.style.display = 'none'
      }
    }

    /**
     * 设置所有事件监听器
     */
    setupEventListeners() {
      document.addEventListener('mouseup', this.boundHandleMouseUp)
      document.addEventListener('mousedown', this.boundHandleMouseDown)
      window.addEventListener('scroll', this.debouncedHide)
      window.addEventListener('resize', this.debouncedHide)
    }

    /**
     * 处理鼠标抬起事件
     */
    handleMouseUp(event) {
      if (event.target === this.button) return

      setTimeout(() => {
        const selection = window.getSelection()
        if (selection.toString().trim()) {
          this.show(selection, event)
        } else {
          this.hide()
        }
      }, 10) // 短暂延迟确保选择完成
    }

    /**
     * 处理鼠标按下事件
     */
    handleMouseDown(event) {
      if (event.target !== this.button) {
        this.hide()
      }
    }

    /**
     * 防抖函数
     */
    debounce(func, wait) {
      let timeout
      return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
      }
    }

    /**
     * 清理资源方法
     */
    destroy() {
      // 移除所有事件监听
      document.removeEventListener('mouseup', this.boundHandleMouseUp)
      document.removeEventListener('mousedown', this.boundHandleMouseDown)
      window.removeEventListener('scroll', this.debouncedHide)
      window.removeEventListener('resize', this.debouncedHide)

      if (this.button) {
        this.button.removeEventListener('click', this.boundHandleClick)
        if (this.button.parentNode) {
          this.button.parentNode.removeChild(this.button)
        }
        this.button = null
      }
    }
  }

  // 初始化并暴露实例到全局作用域（如有需要）
  window.quickCopy = new QuickCopyButton()
})()
