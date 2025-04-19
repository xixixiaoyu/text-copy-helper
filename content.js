// 创建悬浮复制按钮
function createCopyButton() {
  const button = document.createElement('div')
  button.id = 'quick-copy-button'
  button.textContent = '复制'
  button.style.display = 'none'
  document.body.appendChild(button)
  return button
}

// 显示复制按钮
function showCopyButton(selection) {
  const selectedText = selection.toString().trim()
  if (!selectedText) return

  const copyButton = document.getElementById('quick-copy-button') || createCopyButton()

  // 获取选中文本的位置信息
  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()

  // 计算按钮位置（考虑页面滚动）
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

  copyButton.style.top = `${rect.bottom + scrollTop + 10}px`
  copyButton.style.left = `${rect.left + scrollLeft + rect.width / 2 - 20}px`
  copyButton.style.display = 'block'

  // 添加点击事件
  copyButton.onclick = (e) => {
    e.stopPropagation() // 防止事件冒泡
    navigator.clipboard
      .writeText(selectedText)
      .then(() => {
        // 复制成功效果
        copyButton.textContent = '已复制'
        copyButton.classList.add('copied')
        setTimeout(() => {
          copyButton.textContent = '复制'
          copyButton.classList.remove('copied')
          copyButton.style.display = 'none'
        }, 1000)
      })
      .catch((err) => {
        console.error('复制失败:', err)
        copyButton.textContent = '失败'
        setTimeout(() => {
          copyButton.textContent = '复制'
          copyButton.style.display = 'none'
        }, 1000)
      })
  }
}

// 监听选择文本事件
document.addEventListener('mouseup', () => {
  setTimeout(() => {
    const selection = window.getSelection()
    if (selection.toString().trim()) {
      showCopyButton(selection)
    } else {
      // 没有选中文本时隐藏按钮
      const copyButton = document.getElementById('quick-copy-button')
      if (copyButton) {
        copyButton.style.display = 'none'
      }
    }
  }, 10) // 短暂延迟确保选择完成
})

// 点击其他区域时隐藏按钮
document.addEventListener('mousedown', (event) => {
  const copyButton = document.getElementById('quick-copy-button')
  if (copyButton && event.target !== copyButton) {
    copyButton.style.display = 'none'
  }
})

// 页面滚动时隐藏按钮
window.addEventListener('scroll', () => {
  const copyButton = document.getElementById('quick-copy-button')
  if (copyButton) {
    copyButton.style.display = 'none'
  }
})

// 初始化
createCopyButton()
