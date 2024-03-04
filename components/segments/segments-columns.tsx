'use client'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { targeting } from '@/components/data-table/data'
import { Segment } from '@/components/data-table/schemas'
import { DataTableColumnHeader } from '../data-table/data-table-column-header'
import { DataTableRowActions } from '../data-table/data-table-row-actions'

export const columns: ColumnDef<Segment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' className='translate-y-[2px]' />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => {
      return <span className='max-w-[500px] truncate font-medium'>{row.getValue('name')}</span>
    }
  },
  {
    accessorKey: 'targeting',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Targeting' />,
    cell: ({ row }) => {
      const target = targeting.find((target) => target.value === row.getValue('targeting'))

      if (!target) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          {target.icon && <target.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
          <span>{target.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions itemId={row.original.id} />
  }
]
