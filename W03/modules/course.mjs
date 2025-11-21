// Course object moved here
const byuiCourse = {
  code: "WDD 330",
  name: "Web Frontend Development II",
  sections: [
    { sectionNum: 1, roomNum: "STC 347", enrolled: 26, days: "TTh", instructor: "Bro Smith" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 28, days: "MWF", instructor: "Sis Jones" },
    { sectionNum: 3, roomNum: "STC 361", enrolled: 30, days: "TTh", instructor: "Bro Tippetts" }
  ],

  changeEnrollment(sectionNum, add = true) {
    const section = this.sections.find(sec => sec.sectionNum == sectionNum);
    if (section) {
      if (add) {
        section.enrolled++;
      } else {
        if (section.enrolled > 0) section.enrolled--;
      }
    }
  }
};

export default byuiCourse;
