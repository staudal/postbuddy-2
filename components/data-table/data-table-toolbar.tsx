'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'

import { targeting } from '@/components/data-table/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  openDeleteModal: boolean
  setOpenDeleteModal: (open: boolean) => void
  rowSelection: Record<string, boolean>
}

export function DataTableToolbar<TData>({ table, openDeleteModal, setOpenDeleteModal, rowSelection }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search by name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('targeting') && <DataTableFacetedFilter column={table.getColumn('targeting')} title='Targeting' options={targeting} />}
        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex gap-2'>
        {Object.keys(rowSelection).length > 0 && (
          <Button onClick={() => setOpenDeleteModal(true)} variant='destructive' size={'sm'}>
            Delete selected
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
