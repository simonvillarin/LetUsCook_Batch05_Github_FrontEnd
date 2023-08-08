import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentHistoryService } from 'src/app/shared/services/student-history/student-history.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  history: any = [];
  schoolYears: any = [];
  types = ['Major', 'Minor', 'Elective'];
  studentId: any;

  search = '';
  schoolYear = '';
  type = '';

  constructor(
    private studentHistory: StudentHistoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getStudentHistory();
  }

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

  getStudentHistory = () => {
    this.studentId = this.authService.getUserId();
    this.studentHistory
      .getStudentHistoryById(this.studentId)
      .subscribe((data: any) => {
        this.schoolYears = [];
        this.history = [];
        data.map((h: any) => {
          this.schoolYears.push(`${h.yearLevel} - ${h.sem}`);
          h.schedules.map((sched: any) => {
            this.history.push(sched);
          });
        });
        this.history = this.getUniqueObjects(this.history);
      });
  };

  reset = () => {
    this.search = '';
    this.schoolYear = '';
    this.getStudentHistory();
  };

  onChangeSearch = (searchTerm: string) => {
    if (searchTerm != '') {
      this.studentId = this.authService.getUserId();
      this.studentHistory
        .getStudentHistoryById(this.studentId)
        .subscribe((data: any) => {
          this.history = [];
          data.map((h: any) => {
            h.schedules.map((sched: any) => {
              if (
                sched.subject.subjectTitle
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                this.history.push(sched);
              }
            });
          });
          this.history = this.getUniqueObjects(this.history);
        });
    } else {
      this.getStudentHistory();
    }
  };

  onChangeSchoolYear = (year: string) => {
    if (year != '') {
      if (this.type != '') {
        this.studentId = this.authService.getUserId();
        this.studentHistory
          .getStudentHistoryById(this.studentId)
          .subscribe((data: any) => {
            const split = this.schoolYear.split('-');
            this.history = [];
            data.map((h: any) => {
              h.schedules.map((sched: any) => {
                if (
                  sched.subject.type == this.type &&
                  h.yearLevel == split[0].trim() &&
                  h.sem == split[1].trim()
                ) {
                  this.history.push(sched);
                }
              });
            });
            this.history = this.getUniqueObjects(this.history);
          });
      }

      this.studentId = this.authService.getUserId();
      this.studentHistory
        .getStudentHistoryById(this.studentId)
        .subscribe((data: any) => {
          const split = year.split('-');
          this.history = [];
          data.map((h: any) => {
            h.schedules.map((sched: any) => {
              if (
                h.student.yearLevel == split[0].trim() &&
                h.student.sem == split[1].trim()
              ) {
                this.history.push(sched);
              }
            });
          });
          this.history = this.getUniqueObjects(this.history);
        });
    } else {
      this.getStudentHistory();
    }
  };

  onChangeType = (type: string) => {
    if (type != '') {
      if (this.schoolYear != '') {
        this.studentId = this.authService.getUserId();
        this.studentHistory
          .getStudentHistoryById(this.studentId)
          .subscribe((data: any) => {
            const split = this.schoolYear.split('-');
            this.history = [];
            data.map((h: any) => {
              h.schedules.map((sched: any) => {
                if (
                  sched.subject.type == type &&
                  h.yearLevel == split[0].trim() &&
                  h.sem == split[1].trim()
                ) {
                  this.history.push(sched);
                }
              });
            });
            this.history = this.getUniqueObjects(this.history);
          });
      }
      this.studentId = this.authService.getUserId();
      this.studentHistory
        .getStudentHistoryById(this.studentId)
        .subscribe((data: any) => {
          const split = this.schoolYear.split('-');
          this.history = [];
          data.map((h: any) => {
            h.schedules.map((sched: any) => {
              if (sched.subject.type == type) {
                this.history.push(sched);
              }
            });
          });
          this.history = this.getUniqueObjects(this.history);
        });
    } else {
      this.getStudentHistory();
    }
  };
}
