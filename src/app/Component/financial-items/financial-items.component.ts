import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { L10n, setCulture } from '@syncfusion/ej2-base'
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { CommandModel, GridComponent} from '@syncfusion/ej2-angular-grids';
import { CheckBoxComponent} from '@syncfusion/ej2-angular-buttons';
import * as data from '../../../assets/data.json'
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

setCulture('en-US');
L10n.load({
    'en-US': {
        'pager': {
            'currentPageInfo': '',
            'totalItemsInfo': '{1} to {2} of {0}',
        }
    }
});

@Component({
  selector: 'app-financial-items',
  templateUrl: './financial-items.component.html',
  styleUrl: './financial-items.component.scss',
})

export class FinancialItemsComponent implements OnInit {

  @ViewChild('grid') 
  public grid!: GridComponent
  @ViewChild('checkbox')
  public checkbox!: CheckBoxComponent


  data!: Object[];
  public intialPage!: Object;
  public initialSort!: Object;
  public pageSettings!: Object;
  public category!: string[]
  public jsonData!: Object[]
  public printData!: Object[]
  public editSettings!: Object;
  public toolbar!: string[];
  public orderidrules!: Object;
  public customeridrules!: Object;
  public freightrules!: Object;
  public editparams!: Object;
  public commands!: CommandModel[]
  
  constructor(private http: HttpClient){  }

    public ngOnInit(): void {
      // Data fetching from assets folder
      this.http.get<any[]>('assets/data.json').subscribe(data=>{
        this.data = data;
        console.log('JSON Data',data)
      })

      this.intialPage = { pageSizes: true, pageCount: 5 }
      
      // Sorting data
      this.initialSort = {
        column: [{field: 'MDRM', direction: 'Ascending'},
      {field: 'ItemName', direction: 'Descending'}]
      }
      this.pageSettings = {pageCount:5}

      // Filtering data
      this.printData = data
      this.category = ['All', 'HC', 'HC-C', 'HC-F', 'HC-L', 'HI', 'HI-A']
      this.jsonData = this.category
     
      // Add, Edir and delete data
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' }
      this.toolbar = ['Add', 'Edit', 'Delete', 'PdfExport'];
      this.orderidrules = { required: true, number: true };
      this.customeridrules = { required: true }
      this.freightrules =  { required: true };
      this.editparams = { params: { popupHeight: '300px' }};

      // Edit icon on each row to edit and delete data
      this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
      { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },]
    }

    // Filter by column
    public onChange(e:ChangeEventArgs):void{
      if(e.value === 'All'){
        this.grid.clearFiltering();
      }else {
        this.grid.filterByColumn('schedule', 'equal', e.value as any);
    }
    }

    // TO enable custome edit options
    public checkboxChange(e:any):void{
      if(e.checked){
        this.grid.filterSettings.showFilterBarOperator = true;
      }
      else {
        this.grid.filterSettings.showFilterBarOperator = false;
      }
    }

    // Method to export pdf 
    toolbarClick(args: ClickEventArgs):void{
      if(args.item.id == 'AdvancedExport_pdfexport'){
        this.grid.pdfExport(this.getPdfExportProperties())
      }
    }

    // Get data
    private getDate(): string {
      let date: string = '';
      date += ((new Date()).getMonth().toString()) + '/' + ((new Date()).getDate().toString());
      return date += '/' + ((new Date()).getFullYear().toString());
  }

  // Custome method properties for pdf file
    private getPdfExportProperties():any{
      return {
        header: {
          fromTop: 0,
          height: 120,
          contents: [
            {
              type: 'Text',
              value: 'INVOICE',
              position: {x: 280, y: 0},
              style: { textBrushColor: '#C25050', fontSize: 25 }
            },
            {
              type: 'Text',
              value: 'INVOICE NUMBER',
              position: { x: 500, y: 30 },
              style: { textBrushColor: '#C67878', fontSize: 10 },
            }, 
            {
              type: 'Text',
              value: 'Date',
              position: { x: 600, y: 30 },
              style: { textBrushColor: '#C67878', fontSize: 10 },
            },
            {
              type: 'Text',
              value: '223344',
              position: {x: 500, y:50},
              style: {  textBrushColor: '#000000', fontSize: 10 }
            }, 
            {
              type: 'Text',
              value: this.getDate(),
              position: { x: 600, y: 50 },
              style: {  textBrushColor: '#000000', fontSize: 10 }
            },
            {
              type: 'Text',
              value: 'CUSTOMER ID',
              position: { x: 500, y: 70 },
              style: { textBrushColor: '#C67878', fontSize: 10  }
            },
            {
              type: 'Text',
              value: 'TERMS',
              position: { x: 600, y: 70 },
              style: { textBrushColor: '#C67878', fontSize: 10 },
          }, {
              type: 'Text',
              value: '223',
              position: { x: 500, y: 90 },
              style: { textBrushColor: '#000000', fontSize: 10 },
          },
          {
              type: 'Text',
              value: 'Net 30 days',
              position: { x: 600, y: 90 },
              style: { textBrushColor: '#000000', fontSize: 10 },
          },
          {
            type: 'Text',
            value: 'Financial Items',
            position: { x: 20, y: 30 },
            style: { textBrushColor: '#C67878', fontSize: 20 }
        },
        {
            type: 'Text',
            value: '2501 Gomti Nagar, Lucknow',
            position: { x: 20, y: 65 },
            style: { textBrushColor: '#000000', fontSize: 11 }
        },
        {
            type: 'Text',
            value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
            position: { x: 20, y: 80 },
            style: { textBrushColor: '#000000', fontSize: 11 }
        },
          ]
        }, 
        footer: {
          fromBottom: 160,
          height: 100,
          contents: [
            {
              type: 'Text',
              value: 'Thank you for your business!',
              position: { x: 250, y: 20 },
              style: {textBrushColor: '#C67878', fontSize: 14}
            }, 
            {
              type: 'Text',
              value: '! Visit Again !',
              position: { x: 300, y: 45 },
              style: {  textBrushColor: '#C67878', fontSize: 14  }
            }
          ]
        },
        fileName: "pdfDocument.pdf"
      }
    }



}
