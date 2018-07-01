import { Component, OnInit } from '@angular/core';
import { Global } from './../../services/global';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/projec.service';
import { UploadService } from './../../services/upload.service';
// import { url } from 'inspector';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public saveProject;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = 'Crear Proyecto';
    this.project = new Project('', '', '', '', 2019, '' , '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(this.project);
    // guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {

          // subimos la imagen
          this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.saveProject = result.project;
              this.status = 'success';
              form.reset();
              console.log(result);
          });


        } else {
          this.status = 'failed';
        }
        // console.log(response);
      },
      error => {
        console.log(<any>error);
      }

    );
  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
