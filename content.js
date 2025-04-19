let copyButton = null

// 创建或获取悬浮复制按钮
function getOrCreateCopyButton() {
  if (!copyButton) {
    copyButton = document.createElement('div')
    copyButton.id = 'quick-copy-button'
    copyButton.textContent = '复制'
    copyButton.style.display = 'none'
    document.body.appendChild(copyButton)

    // 添加点击事件 (只添加一次)
    copyButton.onclick = e => {
      e.stopPropagation() // 防止事件冒泡
      const selectedText = window.getSelection().toString().trim()
      if (!selectedText) return // 以防万一在点击时选择消失

      navigator.clipboard
        .writeText(selectedText)
        .then(() => {
          // 复制成功效果
          copyButton.textContent = '已复制'
          copyButton.classList.add('copied')
          setTimeout(() => {
            copyButton.textContent = '复制'
            copyButton.classList.remove('copied')
            hideCopyButton()
          }, 1000)
        })
        .catch(err => {
          console.error('复制失败:', err)
          copyButton.textContent = '失败'
          setTimeout(() => {
            copyButton.textContent = '复制'
            hideCopyButton()
          }, 1000)
        })
    }
  }
  return copyButton
}

// 隐藏复制按钮
function hideCopyButton() {
  const btn = getOrCreateCopyButton()
  if (btn) {
    btn.style.display = 'none'
  }
}

// 防抖函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 显示复制按钮
function showCopyButton(selection) {
  const selectedText = selection.toString().trim()
  if (!selectedText) {
    hideCopyButton()
    return
  }

  const btn = getOrCreateCopyButton()

  // 获取选中文本的位置信息
  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()

  // 计算按钮位置（考虑页面滚动）
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  btn.style.top = `${rect.bottom + scrollTop + 10}px`
  btn.style.left = `${rect.left + scrollLeft + rect.width / 2 - btn.offsetWidth / 2}px` // 居中优化
  btn.style.display = 'block'
  // 点击事件已在 getOrCreateCopyButton 中统一处理
}

// 监听选择文本事件
document.addEventListener('mouseup', () => {
  setTimeout(() => {
    const selection = window.getSelection()
    if (selection.toString().trim()) {
      showCopyButton(selection)
    } else {
      hideCopyButton()
    }
  }, 10) // 短暂延迟确保选择完成
})

// 点击其他区域时隐藏按钮
document.addEventListener('mousedown', event => {
  const btn = getOrCreateCopyButton()
  // 如果点击事件的目标不是按钮本身，则隐藏按钮
  if (btn && event.target !== btn) {
    hideCopyButton()
  }
})

// 页面滚动时隐藏按钮 (添加 debounce 优化)
const debouncedHide = debounce(hideCopyButton, 100) // 100ms 防抖
window.addEventListener('scroll', debouncedHide)

// 初始化时确保按钮存在（但不显示）
getOrCreateCopyButton()
