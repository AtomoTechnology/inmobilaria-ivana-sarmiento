import React, { useRef, useState } from 'react'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Box from '../../components/Box';
import EditIcon from '../../components/icons/EditIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import DeleteModal from '../../components/DeleteModal';

interface IZone {
  id: number;
  name: string;
}
const AllZones = () => {
  const [selectedProducts2, setSelectedProducts2] = useState<IZone[]>();
  const [showDestroyModal, setShowDestroyModal] = useState(false);
  const [show, setShow] = useState(false);
  const currentId = useRef<IZone>();
  const zones: IZone[] = [
    { id: 1, name: 'Hola que tal' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Alice Smith' },
    { id: 4, name: 'Bob Johnson' },
    { id: 5, name: 'Charlie Brown' }
  ]
  console.log(selectedProducts2);

  const edit = (data: IZone) => {
    console.log(data)
  }
  const destroy = (data: IZone) => {
    setShow(!show)
    currentId.current = data;
    console.log(data)
  }

  const destroyt = (id: number) => {
    console.log('ID : ', id)
  }

  const closeModal = () => setShowDestroyModal(false);

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-x-3 items-center justify-center">
        <EditIcon action={() => edit(rowData)} />
        <DeleteIcon action={() => destroy(rowData)} />
      </div>
    );
  }
  return (
    <div className='container m-auto  flex items-center justify-center'>
      <Box className='p-0 overflow-hidden   w-full sm:w-[500px]   '>
        <DataTable
          size="small"
          emptyMessage='Aún no hay zona'
          className='overflow-hidden'
          value={zones}
          selectionMode="checkbox"
          selection={selectedProducts2}
          onSelectionChange={(e: any) => setSelectedProducts2(e.value)}
          dataKey="id"
          responsiveLayout="scroll"
        >
          <Column selectionMode="multiple" style={{ width: 10 }} headerStyle={{ width: 10 }} />
          <Column field="name" header="Nombre" ></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ width: 90 }} />
        </DataTable>
      </Box>
      <DeleteModal show={show} setShow={setShow} destroy={() => destroyt(currentId.current?.id!)} text={`${currentId.current?.name}`} />
    </div>
  )
}

export default AllZones