import { Status } from '../models/Status.js'
import { Tag } from '../models/Tag.js'
import { userType } from '../models/UserType.js'

export const initiliazebd = async (req, res) => {
  try {
    const waiterType = new userType({ name: 'Meser' })
    const kitchenType = new userType({ name: 'Cocina' })
    const systemType = new userType({ name: 'Sistema' })

    await waiterType.save()
    await kitchenType.save()
    await systemType.save()

    await Status.insertMany([
      {
        belongsTo: waiterType._id,
        orderStatus: 1,
        name: 'Pendiente',
      },
      {
        belongsTo: kitchenType._id,
        orderStatus: 2,
        name: 'En proceso',
      },
      {
        belongsTo: kitchenType._id,
        orderStatus: 3,
        name: 'Por entregar',
      },
      {
        belongsTo: waiterType._id,
        orderStatus: 4,
        name: 'Entregada',
      },
      //------------------------------------------
      {
        belongsTo: systemType._id,
        orderStatus: 0,
        name: 'Libre',
      },
      {
        belongsTo: systemType._id,
        orderStatus: 1,
        name: 'Pendiente',
      },

      {
        belongsTo: systemType._id,
        orderStatus: 2,
        name: 'En proceso',
      },

      {
        belongsTo: systemType._id,
        orderStatus: 3,
        name: 'Completado',
      },

      {
        belongsTo: systemType._id,
        orderStatus: 4,
        name: 'Pagada',
      },
    ])

    const tag1 = new Tag({name:"Mexicana", description:"_", isActive: true, image:"https://img1.10bestmedia.com/Images/Photos/256904/LTG_55_660x440_201404252104.jpg"})
    const tag2 = new Tag({name:"Bebidas", description:"_", isActive: true, image:"https://www.alimarket.es/media/images/2019/detalle_art/295001/95109_high_original.jpg"})

    await tag1.save()
    await tag2.save()

    return res.status(201).json({ok:true})
  } catch (error) {
    return res.status(404).json({error: error.message})
  }
}
