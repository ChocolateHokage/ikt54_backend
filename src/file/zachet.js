import docx from "docx";
import fs from 'fs'
import Class from "../class/class.js";
import Subject from "../subjects/subject.js";
import Teacher from "../teachers/teacher.js";
import Speciality from "../speciality/speciality.js";
import Student from "../student/student.js";
import moment from 'moment/moment.js';

class Zachet {
	constructor({ class_id, subject_id, teacher_id }) {
		this.class_id = class_id;
		this.subject_id = subject_id;
		this.teacher_id = teacher_id;
	}

	async create(payload) {
		let borderStyle = {
			top: {
				style: docx.BorderStyle.NIL,
			},
			right: {
				style: docx.BorderStyle.NIL,
			},
			bottom: {
				style: docx.BorderStyle.NIL,
			},
			left: {
				style: docx.BorderStyle.NIL,
			},
		};

		let title = new docx.TextRun({
			text: "Зачётная ведомость",
			bold: true,
			size: 32,
			font: "Times New Roman",
		});

		let subtitle = new docx.TextRun({
			text: "По дисциплине: " + payload.subject[0].full_name,
			bold: true,
			size: 28,
			break: 2,
		});
		let course = new docx.Paragraph({
			children: [
				new docx.TextRun({
					text: "Курс " + payload.class[0].course,
					size: 28,
					bold: true,
					underline: {
						type: docx.UnderlineType.SINGLE,
					},
				}),
			],
			alignment: docx.AlignmentType.RIGHT,
		});
		let group = new docx.Paragraph({
			indent: {
				left: docx.convertInchesToTwip(0.1),
			},
			children: [
				new docx.TextRun({
					text: "Группа: " + payload.class[0].name,
					size: 28,
					bold: true,
					underline: {
						type: docx.UnderlineType.SINGLE,
					},
				}),
			],
		});

		let groupCourse = new docx.Table({
			rows: [
				new docx.TableRow({
					children: [
						new docx.TableCell({
							borders: borderStyle,
							children: [group],
						}),
						new docx.TableCell({
							children: [course],
							borders: borderStyle,
						}),
					],
				}),
			],
			width: {
				size: 9000,
				type: docx.WidthType.DXA,
			},
		});
		let speciality = new docx.Paragraph({
			indent: {
				left: docx.convertInchesToTwip(-0.1),
				right: docx.convertInchesToTwip(-0.3),
			},
			children: [
				new docx.TextRun({
					text: "Специальность:",
					break: 1,
					size: 28,
					underline: {
						type: docx.UnderlineType.SINGLE,
					},
				}),
				new docx.TextRun({
					text:
						" " +
						payload.speciality[0].code +
						" " +
						payload.speciality[0].full_name +
						" (" +
						payload.class[0].branch +
						")",
					size: 28,
				}),
			],
		});
		let teacher = new docx.Paragraph({
			indent: {
				left: docx.convertInchesToTwip(-0.1),
			},
			children: [
				new docx.TextRun({
					text: "Преподаватель:",
					size: 28,
					underline: {
						type: docx.UnderlineType.SINGLE,
					},
				}),
				new docx.TextRun({
					text: " " + payload.teacher[0].name,
					size: 28,
				}),
			],
		});

		let table = [
			new docx.TableRow({
				children: [
					new docx.TableCell({
						children: [
							new docx.Paragraph({
								children: [new docx.TextRun({ text: "№", size: 24 })],
								alignment: docx.AlignmentType.CENTER,
							}),
						],
						width: {
							size: 900,
							type: docx.WidthType.DXA,
						},
					}),
					new docx.TableCell({
						children: [
							new docx.Paragraph({
								children: [new docx.TextRun({ text: "Ф.И.О.", size: 24 })],
								alignment: docx.AlignmentType.CENTER,
							}),
						],
						width: {
							size: 4500,
							type: docx.WidthType.DXA,
						},
					}),
					new docx.TableCell({
						children: [
							new docx.Paragraph({
								children: [new docx.TextRun({ text: "Оценка", size: 24 })],
								alignment: docx.AlignmentType.CENTER,
							}),
						],
						width: {
							size: 2350,
							type: docx.WidthType.DXA,
						},
						columnSpan: 2,
					}),
					new docx.TableCell({
						children: [
							new docx.Paragraph({
								children: [new docx.TextRun({ text: "Примечание", size: 24 })],
								alignment: docx.AlignmentType.CENTER,
							}),
						],
						width: {
							size: 2800,
							type: docx.WidthType.DXA,
						},
					}),
				],
			}),
		];
		payload.students.forEach((item, i) => {
			table.push(
				new docx.TableRow({
					children: [
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									outlineLevel: 0,
									children: [new docx.TextRun({ text: i + 1 + ".", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 900,
								type: docx.WidthType.DXA,
							},
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [
										new docx.TextRun({ text: " " + item.full_name, size: 20 }),
									],
									spacing: {
										before: 10,
										after: 10,
									},
									alignment: docx.AlignmentType.LEFT,
								}),
							],
							width: {
								size: 4500,
								type: docx.WidthType.DXA,
							},
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "", size: 24 })],
									alignment: docx.AlignmentType.LEFT,
								}),
							],
							width: {
								size: 1050,
								type: docx.WidthType.DXA,
							},
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "", size: 24 })],
									alignment: docx.AlignmentType.LEFT,
								}),
							],
							width: {
								size: 1200,
								type: docx.WidthType.DXA,
							},
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: item.note, size: 24 })],
									alignment: docx.AlignmentType.LEFT,
								}),
							],
							width: {
								size: 2800,
								type: docx.WidthType.DXA,
							},
						}),
					],
				}),
			);
		});

		let tableCompleted = new docx.Table({
			indent: {
				size: docx.convertInchesToTwip(-0.3),
				type: docx.WidthType.DXA,
			},
			rows: table,
			width: {
				size: 9900,
				type: docx.WidthType.DXA,
			},
		});

		let totalTabel = new docx.Table({
			indent: {
				size: docx.convertInchesToTwip(-0.3),
				type: docx.WidthType.DXA,
			},
			rows: [
				new docx.TableRow({
					children: [
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "Всего", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							verticalAlign: docx.VerticalAlign.CENTER,
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 100,
								right: 100,
							},
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "Отлично", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 100,
								right: 100,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "Хорошо", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1300,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 100,
								right: 100,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [
										new docx.TextRun({ text: "Удовлетворительно", size: 24 }),
									],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 150,
								right: 150,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [
										new docx.TextRun({ text: "Неудовлетворительно", size: 24 }),
									],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 150,
								right: 150,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [
										new docx.TextRun({ text: "Не аттестованно", size: 24 }),
									],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 100,
								right: 100,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
					],
				}),
				new docx.TableRow({
					children: [
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							verticalAlign: docx.VerticalAlign.CENTER,
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 100,
								top: 500,
								right: 100,
							},
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 100,
								right: 100,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1300,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 100,
								top: 400,
								right: 100,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 150,
								top: 400,
								right: 150,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 150,
								top: 400,
								right: 150,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
						new docx.TableCell({
							children: [
								new docx.Paragraph({
									children: [new docx.TextRun({ text: "", size: 24 })],
									alignment: docx.AlignmentType.CENTER,
								}),
							],
							width: {
								size: 1100,
								type: docx.WidthType.DXA,
							},
							margins: {
								left: 100,
								top: 400,
								right: 100,
							},
							verticalAlign: docx.VerticalAlign.CENTER,
						}),
					],
				}),
			],
			width: {
				size: 9900,
				type: docx.WidthType.DXA,
			},
		});

		let endRow = new docx.Table({
			rows: [
				new docx.TableRow({
					children: [
						new docx.TableCell({
							borders: borderStyle,
							children: [
								new docx.Paragraph({
									text: "Дата проведения    __________",
								}),
							],
							margins: {
								left: 300,
								right: 100,
							},
						}),
						new docx.TableCell({
							borders: borderStyle,
							children: [
								new docx.Paragraph({
									text: "Подпись     " + payload.teacher[0].name + "/________",
									alignment: docx.AlignmentType.RIGHT,
								}),
							],
						}),
					],
				}),
			],
			width: {
				size: 8000,
				type: docx.WidthType.DXA,
			},
		});

		this.doc = new docx.Document({
			sections: [
				{
					children: [
						new docx.Paragraph({
							alignment: docx.AlignmentType.CENTER,
							children: [title, subtitle],
						}),
						groupCourse,
						speciality,
						teacher,
						new docx.Paragraph({ text: "" }),
						tableCompleted,
						new docx.Paragraph({ text: "" }),
						totalTabel,
						new docx.Paragraph({ text: "" }),
						endRow,
					],
				},
			],
		});
	}

	async save(callback) {
		let payload = {
			subject: await Subject.getSubjectById(this.subject_id),
			class: await Class.getClassById(this.class_id),
			speciality: await Speciality.getSpecialityByClass(this.class_id),
			teacher: await Teacher.getTeacherById(this.teacher_id),
			students: await Student.getAllStudents(this.class_id),
		};

		if (this.teacher_id == -1) {
			payload.teacher.push({ name: "_________________________" })
		}

		payload.class[0].course = moment(new Date(Date.now())).diff(payload.class[0].join_date, "years") + 1

		payload.class.forEach((item, ind) => {
			payload.class[ind].name =
				item.course +
				payload.speciality[0].name +
				item.after_class +
				"-" +
				item.class_num + 
				(item.type == "ВБ" ? " ВБ" : "")
		});

		let fileName =
			"Зачет-" +
			payload.class[0].name +
			"-" +
			payload.subject[0].name +
			".docx";
		await this.create(payload);
		// console.time("creating file");
		return docx.Packer.toBuffer(this.doc).then((buffer) => {
			fs.writeFile("src/static/files/" + fileName, buffer, (err) => {
				console.error(err, fileName);
				callback(err, fileName);
			});
			// console.timeEnd("creating file");
			// setTimeout(() => {
			//   if (callback) callback(null, fileName)
			// }, 3000)
			return fileName;
		});
	}
}

export default Zachet;

// let e = new Zachet({ class_id: process.env.CID, subject_id: process.env.SID, teacher_id: process.env.TID })
// e.save((err, result) => {
//     if (err) console.error(err);
//     else console.log(result);
//     process.exit(1)
// })
