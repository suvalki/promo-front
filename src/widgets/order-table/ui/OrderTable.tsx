import { flexRender } from "@tanstack/react-table";
import {
  Table,
  Group,
  TextInput,
  Pagination,
  Select,
  Text,
  Box,
  Paper,
  Loader,
  ActionIcon,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
  IconX,
} from "@tabler/icons-react";
import { useOrderTable } from "../model/useOrderTable";

export const OrderTable = () => {
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    dateRange,
    setDateRange,
    data,
    isLoading,
    table,
    columns,
  } = useOrderTable();

  return (
    <Box>
      <Group justify="space-between" mb="md" align="flex-end">
        <Group align="flex-end" flex={1}>
          <TextInput
            label="Поиск"
            placeholder="Поиск по клиенту или телефону..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ width: 250 }}
            rightSection={
              search ? (
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray"
                  onClick={() => setSearch("")}
                >
                  <IconX size={14} />
                </ActionIcon>
              ) : null
            }
          />
          <DatePickerInput
            label="Период создания"
            type="range"
            placeholder="Выберите диапазон"
            value={dateRange}
            onChange={(val) => setDateRange(val as [Date | null, Date | null])}
            clearable
            style={{ width: 300 }}
          />
        </Group>
      </Group>

      <Paper
        withBorder
        radius="md"
        style={{ overflow: "hidden", position: "relative" }}
      >
        {isLoading && (
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Loader />
          </Box>
        )}
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th
                    key={header.id}
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                      userSelect: "none",
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Group gap="xs" wrap="nowrap">
                      <Box style={{ whiteSpace: "nowrap" }}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Box>
                      {header.column.getCanSort() && (
                        <Box
                          style={{
                            opacity: header.column.getIsSorted() ? 1 : 0.3,
                          }}
                        >
                          {header.column.getIsSorted() === "asc" ? (
                            <IconSortAscending size={16} />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <IconSortDescending size={16} />
                          ) : (
                            <IconArrowsSort size={16} />
                          )}
                        </Box>
                      )}
                    </Group>
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
            {!isLoading && data?.data?.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={columns.length} ta="center" py="xl">
                  <Text c="dimmed">Заказов не найдено</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      <Group justify="space-between" mt="md">
        <Group>
          <Text size="sm">Показывать по:</Text>
          <Select
            data={["10", "20", "50"]}
            value={pageSize.toString()}
            onChange={(value) => setPageSize(Number(value))}
            style={{ width: 80 }}
            allowDeselect={false}
          />
        </Group>
        <Pagination
          total={data?.totalPages ?? 1}
          value={page}
          onChange={setPage}
        />
      </Group>
    </Box>
  );
};
