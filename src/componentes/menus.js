import { Button, Col, Input, Modal, Row, Table, Dropdown, Menu, Checkbox, message, Upload, Space, Form } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import './Tablam.css'
import ReactDragListView from "react-drag-listview";
import { UnorderedListOutlined, LeftCircleOutlined, RightCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@mui/icons-material';
import Highlighter from "react-highlight-words";
import Subnivel from "./subnivel";

const urlApi = 'http://127.0.0.1:3001/menu';
const urlApirol = 'http://127.0.0.1:3001/Opcionxrol/create';

const Tablamenus = () => {
    const [datos, setDatos] = useState([])
    const [sub, setSub] = useState("")
    const [deleteMany, setDeleteMany] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editMenu, setEditMenu] = useState(null);
    const [visible, setVisible] = useState(false)
    const [index, setIndex] = useState(0)
    const searchInput = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rol, setROL] = useState(null)
    const key = 'updatable';

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
        traerTabla()
    }, [])

    const traerTabla = async () =>{
        axios.post(urlApi, {}, {

            "headers": {

                "content-type": "application/json",

            },

        }).then((response) =>
            setDatos(response.data)
        ).catch(error => {
            console.log(error);
        })
    }

    const obtenerSubLvl = (record) =>{
        setIndex(record.index)
        setSub(record.clave)
        setVisible(true)
    }

    const regresar = () =>{
        setVisible(false)
    }

    const onDelete = (record) => {
        console.log(record)
        Modal.confirm({
            title: 'Estás seguro que deseas eliminar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {

            }
        })
    }

    const deleteManySelected = () => {
        Modal.confirm({
            title: 'Estás seguro que deseas eliminar estos registros?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {

            }
        })
    }

    const onUpdateRegister = () => {
        Modal.confirm({
            title: 'Estás seguro que deseas actualizar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {

            }
        })
    }

    const getColumnSearchProps = (dataIndex, name) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${name}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters) && handleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        type="danger"
                        style={{
                            width: 120,
                        }}
                    >
                        Limpiar Filtros
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const datacheck = (record) =>{
        record.visible = !record.visible
    }

    const datacheck2 = (record) =>{
        record.visible = !record.visible
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const [columns, setColumns] = useState([
        {
            orden: 1,
            title: <span className="dragHandler">CLAVE</span>,
            dataIndex: 'clave',
            key: 'clave',
            sorter: (a, b) => a.clave.localeCompare(b.clave),
            ...getColumnSearchProps('clave', 'clave'),
            visible: true,
        },
        {
            orden: 2,
            title: <span className="dragHandler">NOMBRE</span>,
            dataIndex: 'nombre',
            key: 'nombre',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            ...getColumnSearchProps('nombre', 'nombre'),
            visible: true,
        },
        {
            orden: 3,
            title: <span className="dragHandler">DESCRIPCIÓN</span>,
            dataIndex: 'descripcion',
            key: 'descripcion',
            sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
            ...getColumnSearchProps('descripcion', 'descripcion'),
            visible: true,
        },
        {
            orden: 4,
            title: <span className="dragHandler">Visible</span>,
            key: 'ex',
            width: '5%',
            render: (record) => {
                return <>
                    <div>
                    <Checkbox defaultChecked={true} onClick={()=>{
                            datacheck(record)
                        }} style={{
                            marginLeft:20
                        }}/>
                    </div>
                </>
            },
            visible: true,
        },
        {
            orden: 7,
            title: <span className="dragHandler">Acción</span>,
            key: 'ASU',
            width: '10%',
            render: (record) => {
                return <>
                    <div>
                        <EditOutlined onClick={() => {
                            setEditMenu({ ...record })
                        }} style={{ color: "orange", marginLeft:20 }} />
                        <DeleteOutlined onClick={() => {
                            onDelete(record)
                        }} style={{
                            color: "red",
                            marginLeft: 20
                        }} />
                        <RightCircleOutlined onClick={() => {
                            obtenerSubLvl(record)
                        }} style={{
                            color: "blue",
                            marginLeft: 20
                        }} />
                    </div>
                </>
            },
            visible: true,
        }
    ]);

    const [columns1, setColumns1] = useState(columns.filter(column => column.visible))

    const changeData = () => {
        datos.forEach(v => {
            v.key = v.clave
        })
    }

    changeData()

    const rowSelection = {
        selectedRows: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRows)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedRows.length > 0) {
                setDeleteMany(false)
            }
            else {
                setDeleteMany(true)
            }
        }
    };

    const OnDragEnd = (fromIndex, toIndex) => {
        const columnsCopy = columns1.slice();
        const item = columnsCopy.splice(fromIndex - 1, 1)[0];
        columnsCopy.splice(toIndex - 1, 0, item);
        setColumns1(columnsCopy);
    };

    const onClick = ({ key }) => {
        const newColumns = columns
        for (var i = 0; i < newColumns.length; i++) {
            console.log(newColumns[i].dataIndex)
            if (newColumns[i].dataIndex === key) {
                newColumns[i].visible = !newColumns[i].visible;
            }
        }
        console.log(newColumns)
        setColumns1(newColumns.filter(column => column.visible));
    };

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    key: 'clave',
                    label: (<Checkbox defaultChecked={true}>CLAVE</Checkbox>)
                },
                {
                    key: 'nombre',
                    label: (<Checkbox defaultChecked={true}>NOMBRE</Checkbox>)
                },
                {
                    key: 'descripcion',
                    label: (<Checkbox defaultChecked={true}>DESCRIPCIÓN</Checkbox>)
                },
            ]}
        />
    );

    //SUBMENU
    const onDelete2 = (record) => {
        console.log(record)
        Modal.confirm({
            title: 'Estás seguro que deseas eliminar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {

            }
        })
    }

    const deleteManySelected2 = () => {
        Modal.confirm({
            title: 'Estás seguro que deseas eliminar estos registros?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {

            }
        })
    }

    const onUpdateRegister2 = () => {
        Modal.confirm({
            title: 'Estás seguro que deseas actualizar este registro?',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {

            }
        })
    }

    const getColumnSearchProps2 = (dataIndex, name) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${name}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters) && handleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        type="danger"
                        style={{
                            width: 120,
                        }}
                    >
                        Limpiar Filtros
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch2 = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset2 = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const [columns2, setColumns2] = useState([
        {
            orden: 1,
            title: <span className="dragHandler">CLAVE</span>,
            dataIndex: 'clave',
            key: 'clave',
            sorter: (a, b) => a.clave.localeCompare(b.clave),
            ...getColumnSearchProps('clave', 'clave'),
            visible: true,
        },
        {
            orden: 2,
            title: <span className="dragHandler">NOMBRE</span>,
            dataIndex: 'nombre',
            key: 'nombre',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            ...getColumnSearchProps('nombre', 'nombre'),
            visible: true,
        },
        {
            orden: 3,
            title: <span className="dragHandler">DESCRIPCIÓN</span>,
            dataIndex: 'descripcion',
            key: 'descripcion',
            sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
            ...getColumnSearchProps('descripcion', 'descripcion'),
            visible: true,
        },
        {
            orden: 4,
            title: <span className="dragHandler">Visible</span>,
            key: 'vis',
            width: '5%',
            render: (record) => {
                return <>
                    <div>
                        <Checkbox defaultChecked={true} onClick={()=>{
                            datacheck2(record)
                        }} style={{
                            marginLeft:20
                        }}/>
                    </div>
                </>
            },
            visible: true,
        },
        {
            orden: 7,
            title: <span className="dragHandler">Acción</span>,
            key: 'ASU',
            width: '10%',
            render: (record) => {
                return <>
                    <div>
                        <EditOutlined onClick={() => {
                            setEditMenu({ ...record })
                        }} style={{ color: "orange", marginLeft:20 }} />
                        <DeleteOutlined onClick={() => {
                            onDelete(record)
                        }} style={{
                            color: "red",
                            marginLeft: 30
                        }} />
                    </div>
                </>
            },
            visible: true,
        }
    ]);

    const [columns12, setColumns12] = useState(columns.filter(column => column.visible))

    const changeData2 = () => {

        datos.forEach(element => {
            if(element.clave == sub){
                element.subnivel.forEach(v => {
                    v.key = v.clave
                });
            }
        });
    }

    changeData2()

    const rowSelection2 = {
        selectedRows: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRows)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (selectedRows.length > 0) {
                setDeleteMany(false)
            }
            else {
                setDeleteMany(true)
            }
        }
    };

    const OnDragEnd2 = (fromIndex, toIndex) => {
        const columnsCopy = columns12.slice();
        const item = columnsCopy.splice(fromIndex - 1, 1)[0];
        columnsCopy.splice(toIndex - 1, 0, item);
        setColumns12(columnsCopy);
    };

    const onClick2 = ({ key }) => {
        const newColumns = columns
        for (var i = 0; i < newColumns.length; i++) {
            console.log(newColumns[i].dataIndex)
            if (newColumns[i].dataIndex === key) {
                newColumns[i].visible = !newColumns[i].visible;
            }
        }
        console.log(newColumns)
        setColumns1(newColumns.filter(column => column.visible));
    };

    const menu2 = (
        <Menu
            onClick={onClick}
            items={[
                {
                    key: 'clave',
                    label: (<Checkbox defaultChecked={true}>CLAVE</Checkbox>)
                },
                {
                    key: 'nombre',
                    label: (<Checkbox defaultChecked={true}>NOMBRE</Checkbox>)
                },
                {
                    key: 'descripcion',
                    label: (<Checkbox defaultChecked={true}>DESCRIPCIÓN</Checkbox>)
                }
            ]}
        />
    );

    const onFinish = async () => {
        await axios.post(urlApirol, { ROL_NUMCTRL: rol ,OXR_MENU:datos }).then((response) => {
          console.log(response.data);
          message.loading({
            content: 'Ingresando Datos...', duration: 2, key, style: {
              marginTop: '18vh',
            },
          });
          setTimeout(() => {
            message.success({
              content: 'Datos Registrados', key, duration: 2, style: {
                marginTop: '18vh',
              },
            });
          }, 1000);
          window.setTimeout(function () {
            window.location.reload();
          }, 4000);
        }).catch(errorInfo => {
          console.log(errorInfo);
          message.loading({
            content: 'Verificando...', key, style: {
              marginTop: '18vh',
            },
          });
          setTimeout(() => {
            message.error({
              content: 'Por favor verifica que los datos se han llenado de manera correcta!', key, duration: 4, style: {
                marginTop: '18vh',
              },
            });
          }, 1000);
        })
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (

        <div >
            <Row>
                <Col offset={2}>
                    <PlusCircleOutlined onClick={showModal} style={{ fontSize: "30px", color:"#3941b9" }} />
                </Col>
            </Row>
            {
                visible ?
                <Row>
                    <Col offset={3} lg={20}>
                        <LeftCircleOutlined style={{ fontSize: "30px", color:"#3941b9" }}
                        onClick={()=>{
                            regresar()
                        }}/>
                    </Col>
                </Row> :
                null
            }
            <br></br>
            {
                visible ?
                null :
                <>
                <Row>
                    <Col offset={2} lg={1} md={24} sm={24} xs={24}>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button><UnorderedListOutlined style={{ fontSize: '16px', color: '#08c' }} /></Button>
                        </Dropdown>
                    </Col>
                    <Col lg={1} md={24} sm={24} xs={24} >
                        <Button type="danger" disabled={deleteMany} onClick={() => {
                            deleteManySelected()
                        }}>
                            <DeleteOutlined />
                        </Button>
                    </Col>
                </Row>
              <br></br>
                </>
            }
            <Row>
                <Col offset={2} lg={20}>
                    {
                        visible ?
                        <Row>
                            <Col offset={2} lg={20}>
                            <ReactDragListView.DragColumn onDragEnd={OnDragEnd2} nodeSelector="th">
                                        <Table
                                            showHeader={true}
                                            rowSelection={{ type: 'checkbox', ...rowSelection2, }}
                                            columns={columns2}
                                            dataSource={datos[index].subnivel}
                                            bordered
                                            size="middle"
                                        />
                            </ReactDragListView.DragColumn>
                            </Col>
                        </Row>
                            :
                        <ReactDragListView.DragColumn onDragEnd={OnDragEnd} nodeSelector="th">
                                    <Table
                                        showHeader={true}
                                        rowSelection={{ type: 'checkbox', ...rowSelection, }}
                                        columns={columns1}
                                        dataSource={datos}
                                        bordered
                                        size="middle"
                                    />
                        </ReactDragListView.DragColumn>
                    }
                </Col>
            </Row>
            <Modal okButtonProps={{ style: { display: 'none' } }} title="Establece el rol" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
          name="rol"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item wrapperCol={{
            span: 16,
            offset: 4,
          }}
            name="rol"
            rules={[
              {
                required: true,
                message: 'Inserta un rol!',
              },
            ]}
          >
           <Input onChange={(x)=>setROL(x.target.value)}/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
            </Modal>
        </div>
    )

}
export default Tablamenus;
