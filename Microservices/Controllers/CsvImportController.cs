using AutoMapper;
using CsvHelper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using Org.BouncyCastle.Utilities;
using System.IO;
using System.Text;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;
using WebApiTemplate.Services;
using static System.Net.WebRequestMethods;

namespace WebApiTemplate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class CsvImportController : Controller
    {
        private readonly IRegisterService _registerService;
        private readonly IFilterService _filterService;
        private readonly IUserTransactionalService _userTransactionalService;
        private readonly IMapper _mapper;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;

        public CsvImportController(IMapper mapper,
            IRegisterService registerService,
            IFilterService filterService,
            IUserTransactionalService userTransactionalService,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager)
        {
            _registerService = registerService;
            _filterService = filterService;
            _userTransactionalService = userTransactionalService;
            _mapper = mapper;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }


        public ActionResult<bool> ImportJson(List<CsvImportSerialize> json_file)
        {
            string json_import = JsonConvert.SerializeObject(json_file);

            bool import_result = false;

            List<RegisterIn> items = new List<RegisterIn>();

            try
            {
                //using (StreamReader r = new StreamReader(json_import))
                //{
                //    string json = r.ReadToEnd();
                //    items = JsonConvert.DeserializeObject<List<RegisterIn>>(json);
                //}

                items = JsonConvert.DeserializeObject<List<RegisterIn>>(json_import);

                import_result = true;
            }
            catch (Exception e)
            {
                import_result = false;

                throw new Exception(e.Message);
            }


            _registerService.AddBulk(items);


            return import_result;
        }



        [HttpPost("ImportCsv")]
        //public ActionResult<bool> ImportCsv([FromForm] CsvImport file)
        public async Task<IActionResult> ImportCsv([FromForm] CsvImport file)
        {

            bool import_result = false;

            //List<CsvImport> items = new List<CsvImport>();
            //CsvImport item = null;

            try
            {
                //foreach (var formFile in files)
                //{
                string[] read;
                char[] separators = { ',' };

                if(file?.FormFile == null || file.FormFile.Length == 0)
                {
                    return BadRequest("Por favor, envie um arquivo CSV válido");
                }

                using (var streamreader = new StreamReader(file.FormFile.OpenReadStream(), Encoding.UTF8))
                {
                    string line;

                    List<CsvImportSerialize> listCsvSerialize = new List<CsvImportSerialize>();

                    string lastAddress = "";

                    while ((line = await streamreader.ReadLineAsync()) != null)
                    {
                        CsvImportSerialize csvSerialize = new CsvImportSerialize();
                        csvSerialize.ZoneId = 12; // always Zone 00

                        //csvSerialize.Address = "A";
                        //csvSerialize.Name = "B";
                        //csvSerialize.Number = "C";
                        //csvSerialize.Phone = "D";
                        //csvSerialize.Observation = "E";
                        //csvSerialize.Tracing = "F";
                        //csvSerialize.ZoneId = 12;

                        var columns = line.Split(';');

                        if (columns[0].Trim().Split(':')[0].ToLower() == "direccion" && columns[0].Trim().Split(':')[1] != null) // set address
                        {
                            csvSerialize.Address = columns[0].Trim().Split(':')[1];
                            lastAddress = columns[0].Trim().Split(':')[1];
                        }
                        else
                        {
                            csvSerialize.Address = lastAddress;
                        }

                        if (columns[0].Trim().ToLower() != "nombre" && columns[0].Trim().Split(':')[0].ToLower() != "direccion") // ignore line
                        {
                            csvSerialize.Name = columns[0].Trim();
                            csvSerialize.Number = columns[1].Trim();
                            csvSerialize.Phone = columns[2].Trim();
                            csvSerialize.Observation = columns[3].Trim();
                            csvSerialize.Tracing = columns[4].Trim();

                            listCsvSerialize.Add(csvSerialize);
                        }




                        //foreach (var column in columns)
                        //{
                        //    if (columns[0].Trim().Split(':')[0].ToLower() == "direccion" && columns[0].Trim().Split(':')[1] != null) // set address
                        //    {
                        //        csvSerialize.Address = column.Trim().Split(':')[1];
                        //    }

                        //    if (columns[0].Trim().ToLower() != "nombre") // ignore line
                        //    {
                        //        csvSerialize.Name = "B";
                        //        csvSerialize.Number = "C";
                        //        csvSerialize.Phone = "D";
                        //        csvSerialize.Observation = "E";
                        //        csvSerialize.Tracing = "F";
                        //    }

                        //    listCsvSerialize.Add(csvSerialize);
                        //}



                        //Console.WriteLine(line);
                        //var columns = line.Split(',');
                        //foreach (var column in columns)
                        //{
                        //    Console.WriteLine(column);
                        //}
                    }
                    
                    ImportJson(listCsvSerialize);

                    Console.WriteLine(listCsvSerialize);
                }

                return Ok("Arquivo CSV processado com sucesso.");

                //{
                //    "Address": "PASEO DE HUSARES 2",
                //    "Name": "Antonio Díaz Rentero, Mª Pilar Sánchez Barbero, Marcos Díaz Sánchez",
                //    "Number": "1ºA",
                //    "Phone": 915091824,
                //    "Observation": "Dicen los niños del 1ºB que sí viven. Nos abre un señor bastante majete y nos dice que acaba de comprar.",
                //    "Tracing": "-",
                //    "ZoneId": 8
                //}


                //long size = file.FormFile.Length;

                //using var memoryStream = new MemoryStream(new byte[file.FormFile.Length]);
                //await file.FormFile.CopyToAsync(memoryStream);
                //memoryStream.Position = 0;

                //using (var reader = new StreamReader(memoryStream))
                //{
                //    reader.Read();
                //    //var records = reader.ReadLine();

                //    string data = null;

                //    while ((data = reader.ReadLine()) != null)
                //    {
                //        read = data.Split(separators, StringSplitOptions.RemoveEmptyEntries);
                //    }
                //}




                //if (file.FormFile.Length > 0)
                //{
                //    var filePath = Path.GetTempFileName();

                //    //using (var stream = System.IO.File.Create(filePath))
                //    using (var stream = new StreamReader(System.IO.File.Create(filePath)))
                //    {
                //        //await file.FormFile.CopyToAsync(stream);
                //        string data = stream.ReadLine();

                //        while ((data = stream.ReadLine()) != null)
                //        {
                //            read = data.Split(seperators, StringSplitOptions.RemoveEmptyEntries);
                //        }
                //    }
                //}
                //}
                //using (StreamReader r = new StreamReader($"Files/{file.FormFile}"))
                //using (StreamReader r = new StreamReader($"{file.FileName}"))
                //{
                //    string csv = r.ReadToEnd();
                //    //item = JsonConvert.DeserializeObject<List<CsvImport>>(csv);
                //}

                //import_result = true;
            }
            catch (Exception e)
            {
                import_result = false;

                throw new Exception(e.Message);
            }


            //_registerService.AddBulk(items);

            return Ok();
            //return import_result;
        }
    }
}
