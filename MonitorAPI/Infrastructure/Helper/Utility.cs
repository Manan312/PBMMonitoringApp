using ClosedXML.Excel;
using Core.DTO;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
namespace Infrastructure.Helper
{
    public static class Utility
    {
        public static byte[] GenerateExcel<T>(List<T> data, string sheetName = "Sheet1")
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add(sheetName);

            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            // Header
            for (int col = 0; col < properties.Length; col++)
            {
                worksheet.Cell(1, col + 1).Value = properties[col].Name;
                worksheet.Cell(1, col + 1).Style.Font.Bold = true;
            }

            // Data
            for (int row = 0; row < data.Count; row++)
            {
                for (int col = 0; col < properties.Length; col++)
                {
                    var value = properties[col].GetValue(data[row]);
                    worksheet.Cell(row + 2, col + 1).Value = value?.ToString();
                }
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);

            return stream.ToArray();
        }
    }
}
