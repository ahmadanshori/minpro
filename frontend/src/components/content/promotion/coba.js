// link = (flag, code, design) => {
//   if (flag == 1) {
//     return "/viewpromot/1/" + code + "/" + design;
//   } else {
//     return "/viewpromot/0/" + code + "/0";
//   }
// };

object = {
  nama: "hanif",
  kelas: "batch"
};
object2 = {
  nama: "dika",
  kelas: "batch"
};
object3 = {
  nama: "lala",
  kelas: "batch"
};
const func = (...input) => {
  return [...input].map(a => a.nama);
};
console.log(func(object, object2, object3));
