const mongoose = require("mongoose");
const agentSchema = require('../agent')

const CounterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        required: true
    }
});

const Counter = mongoose.model('Counter', CounterSchema);

// const getSequenceNextValue = (seqName) => {
//     return new Promise((resolve, reject) => {
//         Counter.findByIdAndUpdate(
//             { "_id": seqName },
//             { "$inc": { "seq": 1 } }
//             , (error, counter) => {
//                 if (error) {
//                     reject(error);
//                 }
//                 if(counter) {
//                     resolve(counter.seq + 1);
//                 } else {
//                     resolve(null);
//                 }
//             });
//     });
// };


const getSequenceNextValue = async (seqName) => {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { "_id": seqName },
        { "$inc": { "seq": 1 } }
      ).exec();
  
      if (counter) {
        return counter.seq + 1;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };
  

const insertCounter = (seqName) => {
    const newCounter = new Counter({ _id: seqName, seq: 1 });
    return new Promise((resolve, reject) => {
    newCounter.save()
        .then(data => {
            resolve(data.seq);
        })
        .catch(err => reject(error));
    });
}



module.exports = {
    Counter,
    getSequenceNextValue,
    insertCounter,
    
}


// agentSchema.post("save", function (next) {
//   let doc = this;
//   counterId.getSequenceNextValue("agentId").
//   then(counter => {
//       console.log("asdasd", counter);
//       if(!counter) {
//         counterId.insertCounter("agentId")
//           .then(counter => {
//               doc.agentId = counter;
//               console.log(doc)
//                next();
//           })
//           // .catch(error => error)
//           .catch(error => next(error))
//       } else {
//           doc.agentId = counter;
//            next();
//       }
//   })
//   // .catch(error => error)
//    .catch(error => next(error))
// });