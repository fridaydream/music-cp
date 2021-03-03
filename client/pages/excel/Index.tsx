
import React from 'react'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Toolbar from '@material-ui/core/Toolbar';

import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';

import { useStyles } from './styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function readWorkbookFromLocalFile(file, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, {type: 'binary'});
      if(callback) callback(workbook);
  };
  reader.readAsBinaryString(file);
}

function to_json(workbook) {
	const result = {};

	// 获取 Excel 中所有表名
	const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']

	sheetNames.forEach(function(sheetName) {
		const worksheet = workbook.Sheets[sheetName];
		result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
	});

	// console.log("打印表信息",JSON.stringify(result, 2, 2));  //显示格式{"表1":[],"表2":[]}
	return result;
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
	sheetName = sheetName || 'sheet1';
	const workbook = {
		SheetNames: [sheetName],
		Sheets: {}
	};
	workbook.Sheets[sheetName] = sheet;
	// 生成excel的配置项
	const wopts = {
		bookType: 'xlsx', // 要生成的文件类型
		bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
		type: 'binary'
	};
	const wbout = XLSX.write(workbook, wopts);
	const blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
	// 字符串转ArrayBuffer
	function s2ab(s) {
		const buf = new ArrayBuffer(s.length);
		const view = new Uint8Array(buf);
		for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	return blob;
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName)
{
	if(typeof url == 'object' && url instanceof Blob)
	{
		url = URL.createObjectURL(url); // 创建blob地址
	}
	const aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	const event;
	if(window.MouseEvent) event = new MouseEvent('click');
	else
	{
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
	aLink.dispatchEvent(event);
}

const Update = () => {
  const classes = useStyles();
  const [tableBody, setTableBody] = React.useState([]);
  const [tableHeader, setTableHeader] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleDownload = () => {
    const aoa = [
      tableHeader,
      ...tableBody
    ];
    const sheet = XLSX.utils.aoa_to_sheet(aoa);
    openDownloadDialog(sheet2blob(sheet), '导出.xlsx');
  }

  const EnhancedTableToolbar = () => {
    return (
      <Toolbar
        className={classes.export}
      >
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleDownload}
          startIcon={<GetAppIcon />}
        >
          导出
        </Button>
      </Toolbar>
    );
  };

  const handleUpdate = (file: File) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // 读取本地excel文件
    readWorkbookFromLocalFile(file, (workbook) => {
      console.log('workbook', workbook);
      const result = to_json(workbook)
      const objKeys = Object.keys(result)
      if (objKeys.length > 1) {
        setOpen(true);
        return
      }
      const tables = result[objKeys[0]];
      const sheetBody = []
      const header = Object.keys(tables[0])[0];
      for (let i = 0; i < tables.length; i++) {
        const row = tables[i];
        const body = row[header];
        const result = body.split('  ').filter(li => li !== '').map(li => li.trim())
        const target = result[1]
        if (target) {
          const index = target.lastIndexOf(' ')
          const pre = target.slice(0, index)
          const next = target.slice(index + 1)
          if (/^\d+$/.test(next)) {
            console.log('yes')
            result.splice(1, 1, pre, next)
          }
        }
        sheetBody.push(result)
      }
      const sheetHeader = header.split('  ').filter(li => li !== '').map(li => li.trim())
      console.log(sheetBody)
      console.log(sheetHeader)
      setTableBody(sheetBody)
      setTableHeader(sheetHeader)
    })
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>❤️婷婷</title>
      </Helmet>
      <Container maxWidth="sm">
        <Grid item lg={12}>
          <Grid direction="column" container spacing={4} justify="center">
            <Grid item>
              <Paper variant="outlined" className={classes.root}>
                <input
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    handleUpdate(file);
                  }}
                  className={classes.input}
                  id="contained-button-video"
                  type="file"
                />
                <label htmlFor="contained-button-video">
                  <Button variant="contained" color="primary" component="span" startIcon={<PublishIcon />}>
                    上传EXCEL
                  </Button>
                </label>

              </Paper>
            </Grid>
           </Grid>
        </Grid>
      </Container>
      {
        tableBody.length > 0 ? (
          <TableContainer component={Paper} className={classes.tableWrap}>
            <EnhancedTableToolbar />
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                    tableHeader.map((li, index) => (
                      <TableCell key={index}>
                        {li}
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {tableBody.map((row, index) => (
                  <TableRow key={index}>
                    {/* <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell> */}
                    {
                      row.map((li, innerIndex) => (
                        <TableCell key={innerIndex}>{li}</TableCell>
                      ))
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null
      }
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          只支持一页的excel
        </Alert>
      </Snackbar>
    </>
  )
}

export default Update
