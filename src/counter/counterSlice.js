import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: {},
  },
  reducers: {
    questionsHandle: (state, action) => {
      state.questions = action.payload
    },
    textColorChange: (state , action) => {
      state.questions[action.payload.id].color = action.payload.arr2
    },
    backgroundColorChange: (state , action) => {
      state.questions[action.payload.id].background = action.payload.arr1
    },
    setOptionBacgroundColor:(state, action) => {
      state.questions[action.payload.id].background[action.payload.ans] = "#263238"
    } ,
    setOptionTextColor: (state, action) => {
      state.questions[action.payload.id].color[action.payload.ans] = "white"
    },
    setUserAnswer: (state,action) => {
    state.questions[action.payload.id].ans = action.payload.ans_id
    }
    },
})

export const { setUserAnswer, setOptionBacgroundColor, setOptionTextColor ,textColorChange, backgroundColorChange, questionsHandle } = counterSlice.actions

export default counterSlice.reducer