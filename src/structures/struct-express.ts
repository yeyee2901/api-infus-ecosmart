import express from 'express'

export interface RequestWithID extends express.Response {
  id: number
}
