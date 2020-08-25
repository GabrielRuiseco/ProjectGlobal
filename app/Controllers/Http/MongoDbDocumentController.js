'use strict'
const Helpers = use('Helpers');
const Drive = use('Drive')
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let directorio = new Schema({
  _id: Schema.Types.ObjectId,
  fileName: String,
  imgsrc_route: String,
  idu: Number,
  expireAt: {type: Date, default: Date.now, expires: 172800000}
});

let Directorio = mongoose.model('directorio', directorio);


class MongoDbDocumentController {

  async mongoConnect() {
    await mongoose.connect('mongodb+srv://Admin:123asterisco@practica1-hjadu.mongodb.net/adonismongo?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).catch(error => {});
  }

  async closeConection(){
    await mongoose.connection.close();
  }

  // async store({request, response}) {
  //
  //   const {task_name, ide} = request.only([
  //     'task_name',
  //     'ide'
  //   ])
  //
  //   // await this.mongoConnect();
  //
  //   let task = await new taskMongo(
  //     {
  //       _id: new mongoose.Types.ObjectId(),
  //       task_name: task_name,
  //       ide: parseInt(ide)
  //     }
  //   );
  //   await task.save()
  //   return response.status(200).json(task);
  // }

  async index({params, response}) {
    await this.closeConection();
    await this.mongoConnect();
    const id = params.id;
    await mongoose.connection.close
    return await Directorio.find({"idu":id});
  }

  // async update({request}) {
  //   const {id, idemployee, task_name} = request.only(['id', 'idemplyee', 'task_name'])
  //
  //   await this.mongoConnect()
  //
  //   await taskMongo.update({_id: id}, {idemployee: idemployee, task_name: task_name})
  // }

  async delete({params}) {
    await this.closeConection();
    await this.mongoConnect()
    return Directorio.findByIdAndDelete(params.id);
  }

  async uploadImg({request, response, params}) {
    const img = request.file('image', {
      type: ['image'],
      size: '2mb',
      allowedExtensions: ['jpg', 'png']
    })

    await this.closeConection();
    await this.mongoConnect();

    const id = new mongoose.Types.ObjectId()

    const imgName = id + '.' + img.extname;
    await img.move(Helpers.tmpPath('uploads'), {
      name: imgName,
      overwrite: true
    })

    if (!img.moved()) {
      return response.status('422').send({
        res: false,
        message: img.error()
      })
    }

    const directorio = await Directorio.create({
      _id: id,
      fileName: imgName,
      imgsrc_route: `uploads/${imgName}`,
      idu: params.id
    })

    return response.json({
      res: true,
      message: 'Succesfully upladed'
    })
  }

  async downloadImg({request, response}) {
    const {fileName} = request.only(['fileName'])
    const filePath = `uploads/${fileName}`;
    const isExist = await Drive.exists(filePath);

    if (isExist) {
      return response.download(Helpers.tmpPath(filePath));
    }
    return 'File does not exist';
  }

  async downloadit({params, response}) {
    const filePath = `uploads/${params.fileName}`;
    const isExist = await Drive.exists(filePath);

    if (isExist) {
      return response.download(Helpers.tmpPath(filePath));
    }
    return 'File does not exist';
  }

  async deleteImg({params, response}) {
    const filePath = `uploads/${params.fileName}`;
    await Drive.delete(filePath);
    const isExist = await Drive.exists(filePath);
    if (!isExist) {
      return response.status(204).send('Succesfully Deleted');
    }
    return response.status(304).send('Not Modified');
  }

}

module.exports = MongoDbDocumentController

