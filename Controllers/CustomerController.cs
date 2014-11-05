using System.Linq;
using System.Web.Mvc;
using KnockoutWithMvc.DAL;
using KnockoutWithMvc.ViewModels;

namespace KnockoutWithMvc.Controllers
{
    public class CustomerController : BaseController
    {
        #region JsonResult

        /// <summary>
        /// Customer List
        /// </summary>
        /// <returns>Display the all customers</returns>
        public JsonResult CustomerList()
        {
            return Json(Db.Customers.ToList(), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Index, Create, Edit, Detail and Delete Methods

        /// <summary>
        /// Manage Customers
        /// </summary>
        /// <returns>Display the list of customers</returns>
        public ActionResult Index()
        {
            return View(Db.Customers.ToList());
        }

        /// <summary>
        /// Create new Customer Form
        /// </summary>
        /// <returns>Display the field to insert new customer</returns>
        public ActionResult Create()
        {
            return View();
        }

        /// <summary>
        /// Create new Customer Post Method
        /// </summary>
        /// <param name="createCustomerViewModel">Contain customer detail in order to save the data</param>
        /// <returns>True: Redirect to Index | False: Show error on page</returns>
        [HttpPost]
        public string Create(CreateCustomerViewModel createCustomerViewModel)
        {
            #region Initialize

            var firstName = createCustomerViewModel.FirstName ?? "";
            var lastName = createCustomerViewModel.LastName.Trim();
            var loginId = createCustomerViewModel.LoginId.Trim();
            var password = createCustomerViewModel.Password.Trim();

            #endregion

            #region LoginId Validation

            // Get Customer object from database
            var validateLoginId = Db.Customers.FirstOrDefault(p => p.LoginId == loginId);

            // If not null then error
            if (validateLoginId != null)
            {
                return "LoginId is present. Try different one!";
            }

            #endregion

            #region Insert new Customer

            if (ModelState.IsValid)
            {
                // Add the customer detail into customer entity
                var insertCustomer = new Customer
                {
                    FirstName = firstName,
                    LastName = lastName,
                    LoginId = loginId,
                    Password = password
                };

                // Save the entity into database
                Db.Customers.Add(insertCustomer);
                Db.SaveChanges();

                // Return success message
                return "success";
            }

            return "Creation failed due to unknown error!";

            #endregion
        }

        /// <summary>
        /// Edit Existing Customer Form
        /// </summary>
        /// <param name="id">CustomerId</param>
        /// <returns>Show the customer detail in editable form</returns>
        public ActionResult Edit(long id)
        {
            #region Id Validation

            var isRedirect = id <= 0;

            if (isRedirect)
            {
                return RedirectToAction("Index");
            }

            #endregion

            #region Fill the ViewModel with Customer Detail

            // Get Customer object from database
            var getCustomer = Db.Customers.Where(w => w.Id == id).Select(
                s => new UpdateCustomerViewModel
                {
                    Id = s.Id,
                    FirstName = s.FirstName,
                    LastName = s.LastName,
                    LoginId = s.LoginId
                }).FirstOrDefault();

            #endregion

            return View(getCustomer);
        }

        /// <summary>
        /// Update the Customer detail
        /// </summary>
        /// <param name="updateCustomerViewModel">Contains customer detail which needs to be update</param>
        /// <returns>True: Redirect to Index | False: Show error on page</returns>
        [HttpPost]
        public ActionResult Edit(UpdateCustomerViewModel updateCustomerViewModel)
        {
            #region Initialize

            var customerId = updateCustomerViewModel.Id;
            var firstName = updateCustomerViewModel.FirstName ?? "";
            var lastName = updateCustomerViewModel.LastName.Trim();
            var loginId = updateCustomerViewModel.LoginId.Trim();
            var password = updateCustomerViewModel.Password.Trim();

            #endregion

            #region LoginId Validation

            // Get Customer object from database
            var validateLoginId =
                Db.Customers.FirstOrDefault(p => p.Id != customerId && p.LoginId == loginId);

            // If not null then error
            if (validateLoginId != null)
            {
                ModelState.AddModelError("LoginId", "LoginId is present. Try different one!");
            }

            #endregion

            #region Update existing Customer

            if (ModelState.IsValid)
            {
                // Get Customer object from database
                var updateCustomer = Db.Customers.FirstOrDefault(p => p.Id == customerId);

                // If not  null
                if (updateCustomer != null)
                {
                    // Update the customer detail into customer entity
                    updateCustomer.FirstName = firstName;
                    updateCustomer.LastName = lastName;
                    updateCustomer.LoginId = loginId;
                    updateCustomer.Password = password;
                }

                // Save the entity into database
                Db.SaveChanges();

                // Redirect to Index
                return RedirectToAction("Index");
            }

            #endregion

            return View();
        }

        /// <summary>
        /// Customer Detail
        /// </summary>
        /// <param name="id">Show the detail filter by Id</param>
        /// <returns>Customer Detail</returns>
        public ActionResult Details(long id = 0)
        {
            var customer = Db.Customers.Find(id);
            
            if (customer == null)
            {
                return HttpNotFound();
            }

            return View(new CustomerViewModel
                {
                    Id = customer.Id,
                    FirstName = customer.FirstName,
                    LastName = customer.LastName,
                    LoginId = customer.LoginId
                });
        }

        /// <summary>
        /// Customer Delete
        /// </summary>
        /// <param name="id">Show the deleting information by Id</param>
        public ActionResult Delete(long id = 0)
        {
            var customer = Db.Customers.Find(id);

            if (customer == null)
            {
                return HttpNotFound();
            }

            return View(new CustomerViewModel
            {
                Id = customer.Id,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                LoginId = customer.LoginId
            });
        }

        /// <summary>
        /// Customer Delete Post
        /// </summary>
        /// <param name="id">Delete the customer by Id</param>
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(long id)
        {
            var customer = Db.Customers.Find(id);
            Db.Customers.Remove(customer);
            Db.SaveChanges();
            return RedirectToAction("Index");
        }

        #endregion

        protected override void Dispose(bool disposing)
        {
            Db.Dispose();
            base.Dispose(disposing);
        }
    }
}