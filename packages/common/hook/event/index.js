import { isAsyncFunction, restArgsAppend } from '@vs-common/utils'

/**
 * 鼠标长按
 * @param callBack            回调函数
 * @param delay               动画帧触发长按回调的前置延迟时长 (ms)
 * @param exeMouseUp          触发长按回调后, 是否在触发鼠标松开时再次调用回调函数
 * @param runningDuration     动画帧长按调用时长 (ms)
 * @param maxRunningDuration  动画帧长按最大调用时长 (ms)
 * @returns {{onMouseUp: onMouseUp, onMouseDown: onMouseDown}}
 */
export const useMouseLongPress = (callBack, {
  delay = 500,
  runningDuration = 0,
  maxRunningDuration = 3000,
  exeMouseUp = true } = {}) => {
  
  let pressDownTime = 0,
      lastTime = 0,
      longPressStartTime = 0,
      framer = null,
      timer = null,
      isDone = false,
      isImproper = false
  
  /**
   * 结束动画帧
   */
  const done = (improperExit = false) => {
    
    if (improperExit) {
      isImproper = true
      // 按下时间在 onMouseUp 中的存在逻辑需要
      // 所以只有在异常逻辑情况下才去重置
      pressDownTime = 0
    }
    
    isDone = true
    lastTime = 0
    longPressStartTime = 0
    
    if (framer !== null) {
      cancelAnimationFrame(framer)
      framer = null
    }
    
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }
  
  /**
   * 鼠标按下事件
   * @param args
   */
  const onMouseDown = (...args) => {
    
    // Rest参数追加处理
    const restArgsCopy = restArgsAppend(args, { done, type: onMouseDown.name })
    
    // 记录按下时间
    pressDownTime = Date.now()
    
    // 动画帧步进
    const animationFrameStep = async timestamp => {
      
      // 降低调用率
      if (lastTime !== timestamp) {
        
        lastTime = timestamp
        
        // 记录长按开始毫秒时间戳
        if (longPressStartTime === 0) {
          isDone = false
          isImproper = false
          longPressStartTime = timestamp
        }
        
        // 长按时长
        const longPressDuration = timestamp - longPressStartTime
        
        // 长按时长超出动画帧长按最大调用时长
        if (longPressDuration > maxRunningDuration) {
          console.error(`函数调用终止: onMouseDown, 原因: 长按时长 '${longPressDuration} ms' 超出动画帧长按最大调用时长 ${maxRunningDuration} ms`)
          return done(true)
        }
        
        // 长按结束时间
        const longPressEndTime = longPressStartTime + runningDuration
        
        // 如果未设置动画帧长按调用时长 || 长按结束时长大于等于当前时间戳
        if ((longPressEndTime === longPressStartTime || longPressEndTime >= timestamp)) {
          // 执行回调函数
          isAsyncFunction(callBack) ? await callBack(...restArgsCopy) : callBack(...restArgsCopy)
          // callBack 内未执行传递的 done 函数, 继续调用 animationFrameStep
          if (!isDone) {
            framer = requestAnimationFrame(animationFrameStep)
          }
        } else {
          console.log(`函数调用结束: onMouseDown, 原因: 长按时长 '${longPressDuration} ms' 超出动画帧长按调用时长 ${runningDuration} ms`)
          // 保险起见, 防止不可预料的情况导致鼠标松开事件未触发, 从而导致计时器相关任务未清理(虽然有长按最大时长兜底, 还是尽量防范)
          return done()
        }
      }
    }
    
    // delay 秒后调用 animationFrameStep
    timer = setTimeout(() => {
      framer = requestAnimationFrame(animationFrameStep)
    }, delay)
  }
  
  /**
   * 鼠标松开事件
   * @param args
   */
  const onMouseUp = (...args) => {
    // 如果因为异常逻辑而提前终止动画帧任务, 将不进行后续松开事件的执行
    if (isDone && isImproper) {
      isImproper = false
      console.error(`函数调用终止: onMouseUp, 原因: onMouseDown 或 callBack 因为异常逻辑, 已自行提前终止动画帧任务`)
    } else {
      // Rest参数追加处理
      const restArgsCopy = restArgsAppend(args, { type: onMouseUp.name })
      // 长按时长
      const longPressDuration = Date.now() - pressDownTime
      // 重置按下时间
      pressDownTime = 0
      
      done()
      
      // 单击与长按判断
      // 如果长按时长满足前置延迟时长
      if (longPressDuration >= delay) {
        // 如果允许在触发鼠标松开时再次调用回调函数
        exeMouseUp && callBack(...restArgsCopy)
      } else {
        callBack(...restArgsCopy)
      }
    }
  }
  
  return {
    onMouseDown,
    onMouseUp
  }
}