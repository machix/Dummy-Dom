const db = require('../connectors')

const Attachment = {
  Query: {
    findAttachment: (__, data) => {
      return db.Attachment.findById(data.id)
    }
  },
  Mutation: {
    createAttachment: (__, data) => {
      var foreignKey = data.eventModel + 'Id'
      return db.Attachment.create({
        [foreignKey]: data.id,
        fileName: data.fileName,
        fileAlias: data.fileAlias,
        fileType: data.fileType,
        fileSize: data.fileSize
      })
    },
    deleteAttachment: (__, data) => {
      return db.Attachment.destroy({where: {id: data.id}})
    }
  }
}

module.exports = Attachment
