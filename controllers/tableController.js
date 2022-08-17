import { Table } from '../models/Table.js'

export const getTables = async (req, res) => {
  try {
    const tables = await Table.find().populate("status").lean()
    return res.json({ success: true, tables })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

export const getTable = async (req, res) => {
  const { tableId } = req.params
  try {
    const table = await Table.findOne({ _id: tableId }).lean()
    if (!table) throw new Error("Table doesn't exist")

    return res.json({ success: true, table })
  } catch (error) {}
}

export const createTable = async (req, res) => {
  const { name } = req.body
  const initialStatus = '62fc6794771920e088f6ad26'
  try {
    const table = new Table({ name, status: initialStatus })
    await table.save()
    await table.populate('status')
    return res.json({ success: true, table })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

export const removeTable = async (req, res) => {
  const { tableId } = req.params
  try {
    const table = Table.findOne({ _id: tableId })
    if (!table) throw new Error("Table doesn't exist")
    // const tempTable = table.populate('status')
    await table.remove()
    return res.json({ success: true })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

export const updateTable = async (req, res) => {
  const { name } = req.body
  const { tableId } = req.params
  const initialStatus = '62fc6794771920e088f6ad26'
  try {
    const table = await Table.findOne({ _id: tableId })
    if (!table) throw new Error("Table doesn't exist")
    console.log({ table })
    table.name = name
    table.status = initialStatus
    await table.save()
    return res.json({ success: true, table })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}
