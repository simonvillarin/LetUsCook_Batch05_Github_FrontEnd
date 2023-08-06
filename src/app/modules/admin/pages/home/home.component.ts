import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ApplicationService } from 'src/app/shared/services/application/application.service';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { ProfessorService } from 'src/app/shared/services/professor/professor.service';
import { ProgramService } from 'src/app/shared/services/program/program.service';
import { RoomService } from 'src/app/shared/services/room/room.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  admin: any = {};
  student: any = {};
  professor: any = {};
  program: any = {};
  course: any = {};

  programs: any;
  studentPerRoom: any;
  studentStatusPie: any;
  studentBar: any;
  gender: any;
  yearLevel: any;

  userPic: string = '';

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private applicationService: ApplicationService,
    private studentService: StudentService,
    private professorService: ProfessorService,
    private programService: ProgramService,
    private courseService: CourseService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.getAdminById();
    this.getStudentCount();
    this.getProfesorCount();
    this.getProgramCount();
    this.getCourseCount();
    this.getGenderCount();
    this.getNumCoursesPerProgram();
    this.getStudentStatus();
    this.getNumStudentsPerCourseBar();
    this.getStudentPerRoom();
    this.getYearLevel();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  }

  getAdminById = () => {
    this.adminService
      .getAdminById(this.authService.getUserId())
      .subscribe((data: any) => {
        this.admin = data;
        this.userPic = this.admin.image;
      });
  };

  getStudentCount = () => {
    this.studentService.getAllStudents().subscribe((data: any) => {
      const studentCount = data.length;
      this.student = studentCount;
    });
  };

  getProfesorCount = () => {
    this.professorService.getAllProfessors().subscribe((data: any) => {
      const professorCount = data.length;
      this.professor = professorCount;
    });
  };

  getProgramCount = () => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      const programCount = data.length;
      this.program = programCount;
    });
  };

  getCourseCount = () => {
    this.courseService.getAllSubjects().subscribe((data: any) => {
      const courseCount = data.length;
      this.course = courseCount;
    });
  };

  getGenderCount = () => {
    this.studentService.getGenderCount().subscribe((data: any) => {
      this.gender = data;
    });
  };

  getNumCoursesPerProgram = () => {
    this.programService.getAllPrograms().subscribe((data: any) => {
      const labels = data.map((item: any) => item.programCode);
      const majorCounts = data.map((item: any) => item.majors.length);
      const minorCounts = data.map((item: any) => item.minors.length);
      const electiveCounts = data.map((item: any) => item.electives.length);

      const arr: any = [];

      data.map((item: any) => {
        let totalCounts = 0;
        totalCounts +=
          parseInt(item.majors.length) +
          parseInt(item.minors.length) +
          parseInt(item.electives.length);
        arr.push(totalCounts);
      });

      const colors: any = [];

      data.map((color: any) => {
        colors.push(this.getRandomColor().randomColor);
      });

      this.programs = {
        labels: labels,
        datasets: [
          {
            data: arr,
            backgroundColor: colors,
          },
        ],
      };
    });
  };

  isObjectUnique = (obj1: any, obj2: any) => {
    return obj1.subject.subjectId === obj2.subject.subjectId;
  };

  getUniqueObjects = (arr: any) => {
    return arr.filter((item: any, index: any, self: any) => {
      return (
        self.findIndex((obj: any) => this.isObjectUnique(obj, item)) === index
      );
    });
  };

  getStudentStatus = () => {
    this.applicationService.getStatusCount().subscribe((data) => {
      this.studentStatusPie = data;
    });
  };

  getNumStudentsPerCourseBar = () => {
    this.studentService.getAllStudents().subscribe((data) => {
      const arr: any = [];
      const labels: any = [];
      data.map((item: any) => {
        if (item.schedules.length > 0) {
          arr.push(item.schedules);
        }
      });

      arr.map((sched: any) => {
        sched.map((sub: any) => {
          let isExist = false;
          labels.map((t: any) => {
            if (sub.subject.subjectTitle == t) {
              isExist = true;
            }
          });
          if (!isExist) {
            labels.push(sub.subject.subjectTitle);
          }
        });
      });
      const values: any = [];
      labels.map((label: any, i: number) => {
        values[i] = 0;
        data.map((student: any) => {
          student.schedules.map((sched: any) => {
            if (sched.subject.subjectTitle == label) {
              values[i] += 1;
            }
          });
        });
      });

      const colors: any = [];

      data.map((student: any) => {
        colors.push(this.getRandomColor().randomColor);
      });

      this.studentBar = {
        responsive: true,
        labels: labels,
        datasets: [
          {
            label: 'Number of Students',
            data: values,
            backgroundColor: colors,
          },
        ],
      };
    });
  };

  getStudentPerRoom = () => {
    this.roomService.getAllRooms().subscribe((data) => {
      const labels = data.map((room: any) => room.roomNumber);
      const roomData = data.map((rNum: any) => rNum.roomCapacity);
      const colors: any = [];

      data.map((student: any) => {
        colors.push(this.getRandomColor().randomColor);
      });

      this.studentPerRoom = {
        labels: labels,
        datasets: [
          {
            label: 'Room Capacity',
            data: roomData,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };
    });
  };

  getYearLevel = () => {
    this.studentService.getYearLevelCount().subscribe((data) => {
      this.yearLevel = data;
    });
  };

  getRandomColor = () => {
    const minBrightness = 168;
    const maxBrightness = 218;

    const randomRGBValue = (min: any, max: any) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const r = randomRGBValue(minBrightness, maxBrightness);
    const g = randomRGBValue(minBrightness, maxBrightness);
    const b = randomRGBValue(minBrightness, maxBrightness);

    const randomColor = `rgb(${r}, ${g}, ${b})`;

    return { randomColor };
  };
}
