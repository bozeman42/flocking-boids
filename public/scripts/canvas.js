import { WIDTH, HEIGHT } from './constants.js'

export const canvas = document.getElementById('flocking')
export const ctx = canvas.getContext('2d')

canvas.width = WIDTH
canvas.height = HEIGHT

