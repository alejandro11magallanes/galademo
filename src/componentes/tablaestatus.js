import { Button, Col, Input, Modal, Row, Table, Dropdown, Menu, Checkbox, message, Upload, Space } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import './Tablam.css'
import ReactDragListView from "react-drag-listview";
import { UnorderedListOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@mui/icons-material';
import Highlighter from "react-highlight-words";

function Tablaestatus() {
    const [data, setData] = useState([
      {
        id: 1, clave: "PEN", estatus: "PENDIENTE", descripcion: "Este estatus lo asigna la plataforma cuando una Solicitud se captura y queda pendiente de ser terminada para iniciar el proceso de Cancelación."
      },
      {
        id: 2, clave: "SOL", estatus: "SOLICITUD", descripcion: "Estatus para Indicar que la Solicitud se ha creado en la Tienda"
      },
      {
        id: 3, clave: "CAN", estatus: "CANCELADA", descripcion: "Estatus que permite cancelar una Solicitud"
      },
      {
        id: 4, clave: "TER", estatus: "TERMINADA", descripcion: "Estatus para Indicar que la Solicitud a terminado su proceso"
      },
      {
        id: 5, clave: "AGE", estatus: "GERENCIA", descripcion: "Estatus para Indicar que la Solicitud a sido Autorizada por Gerencia de Tiendas o Gerencia Comercial"
      },
      {
        id: 6, clave: "REV", estatus: "REVISADA", descripcion: "Estatus que Indica que la Solicitud ha Sido Revisada por área de pagos"
      },
      {
        id: 7, clave: "APA", estatus: "AUTORIZA PAGO", descripcion: "Estatus que indica que la Solicitud a sido Autorizada para Pago"
      }
    ])
    const [deleteMany, setDeleteMany] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editMenu, setEditMenu] = useState(null);
    const searchInput = useRef(null)

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
            title: <span className="dragHandler">ESTATUS</span>,
            dataIndex: 'estatus',
            key: 'estatus',
            sorter: (a, b) => a.estatus.localeCompare(b.estatus),
            ...getColumnSearchProps('estatus', 'estatus'),
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
            orden: 7,
            title: <span className="dragHandler">Acción</span>,
            key: 'ASU',
            width: '10%',
            render: (record) => {
                return <>
                    <div>
                        <EditOutlined onClick={() => {
                            setEditMenu({ ...record })
                        }} style={{ color: "orange" }} />
                        <DeleteOutlined onClick={() => {
                            onDelete(record)
                        }} style={{
                            color: "red",
                            marginLeft: 50
                        }} />
                    </div>
                </>
            },
            visible: true,
        }
    ]);

    const [columns1, setColumns1] = useState(columns.filter(column => column.visible))

    const changeData = () => {
        data.forEach(v => {
            v.key = v.id
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
                    key: 'estatus',
                    label: (<Checkbox defaultChecked={true}>MENÚ</Checkbox>)
                },
                {
                    key: 'descripcion',
                    label: (<Checkbox defaultChecked={true}>DESCRIPCIÓN</Checkbox>)
                },
            ]}
        />
    );

    return (

        <div >
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
            <Row>
                <Col offset={2} lg={20}>
                  <ReactDragListView.DragColumn onDragEnd={OnDragEnd} nodeSelector="th">
                              <Table
                                  showHeader={true}
                                  rowSelection={{ type: 'checkbox', ...rowSelection, }}
                                  columns={columns1}
                                  dataSource={data}
                                  bordered
                                  size="middle"
                              />
                  </ReactDragListView.DragColumn>
                </Col>
            </Row>

        </div>
    )

}
export default Tablaestatus;
