using System.Web.Mvc;
using KnockoutWithMvc.DAL;

namespace KnockoutWithMvc.Controllers
{
    public class BaseController : Controller
    {
        protected KnockoutJSEntities Db = new KnockoutJSEntities();
    }
}
