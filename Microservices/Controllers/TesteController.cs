using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApiTemplate.Dtos;

namespace WebApiTemplate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class TesteController : ControllerBase
    {
        private static int sum;

        [HttpGet("Get")]
        public async Task<ActionResult<string>> GetAll()
        {
            int init = 0;

            Random rand = new Random();
            int delayTask = rand.Next(1, 6) * 1000;

            sum = 0;

            //var runParalell01 = RepeatTask(init, delayTask)
            //    .ContinueWith(result1 => RepeatTask(result1.Result, delayTask)
            //    .ContinueWith(result2 => RepeatTask(result2.Result, delayTask))).Result.Result.Result;

            //var runParalell02 = RepeatTask(init, delayTask)
            //    .ContinueWith(result1 => RepeatTask(result1.Result, delayTask)
            //    .ContinueWith(result2 => RepeatTask(result2.Result, delayTask)
            //    .ContinueWith(result3 => RepeatTask(result3.Result, delayTask)))).Result.Result.Result.Result;

            var teste = Task.WhenAll(
                Task01(init),
                Task02(init));

            return Ok(teste);

            //var final = runParalell01 + runParalell02;

            //return Ok(runParalell01.ToString() + " + " + runParalell02.ToString() + " = " + (runParalell01 + runParalell02));
        }

        private Task<int> Task02(int init)
        {
            Random rand = new Random();
            int delayTask = rand.Next(8,9) * 1000;

            return RepeatTask(init, delayTask)
                                .ContinueWith(result1 => RepeatTask(result1.Result, delayTask)
                                .ContinueWith(result2 => RepeatTask(result2.Result, delayTask))).Result.Result;
        }

        private Task<int> Task01(int init)
        {
            Random rand = new Random();
            int delayTask = rand.Next(1,2) * 1000;

            var response1 = RepeatTask(init, delayTask);

            int delayTask2 = rand.Next(1,2) * 1000;
            var response2 = response1.ContinueWith(result => RepeatTask(result.Result, delayTask2)).Result;

            int delayTask3 = rand.Next(1,2) * 1000;
            var response3 = response2.ContinueWith(result => RepeatTask(result.Result, delayTask3)).Result;

            var final = delayTask + delayTask2 + delayTask3;

            return response3;
        }

        private async Task<int> FirstTask(int _total)
        {
            await Task.Delay(3000);

            int total = _total;

            total += 1;

            return total;
        }

        private async Task<int> SecondTask(int _total)
        {
            await Task.Delay(3000);

            int total = _total;

            total += 2;

            return total;
        }

        private async Task<int> ThirdTask(int _total)
        {
            await Task.Delay(3000);

            int total = _total;

            total += 4;

            return total;
        }

        private async Task<int> RepeatTask(int _total, int taskDelay)
        {
            await Task.Delay(taskDelay);

            int total = _total;

            total += taskDelay / 1000;

            return total;
        }
    }
}
