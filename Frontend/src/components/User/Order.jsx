import CoffeeLogo from "../../assets/Coffee.png";
import html2pdf from "html2pdf.js/dist/html2pdf.min";

const downloadPDF = (Id) => {
  const printElement = document.getElementById("order-content");

  console.log(printElement);
  const fileName = "InvoiceOrder-" + Id + ".pdf";
  const opt = {
    margin: 10,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 5 },
    jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(printElement).set(opt).save();
};

function Order({ orderDetail }) {
  const handledownloadPDF = () => {
    downloadPDF(orderDetail.orderId);
  };
  console.log("orderDetail", orderDetail);
  console.log("orderDetail.totalPrice:", orderDetail.totalPrice);

  return (
    <div id='order-content'>
      <section className='bg-gray-100 py-4'>
        <div className='max-w-2xl mx-auto py-0 md:py-16'>
          <article className='shadow-none md:shadow-md md:rounded-md overflow-hidden'>
            <div className='md:rounded-b-md  bg-white'>
              <div className='p-9 border-b border-gray-200'>
                <div className='space-y-6'>
                  <div className='flex justify-between items-top'>
                    <div className='space-y-4'>
                      <div className='mx-auto my-auto'>
                        <img
                          className='h-12 object-cover mb-4'
                          src={CoffeeLogo}
                        />
                        <p className='font-bold text-lg'> Invoice </p>
                        <p> Coffee App Application</p>
                        <p className='font-semibold text-lg py-4'>
                          {" "}
                          Your purchase is complete. Thank you for shopping with
                          us!{" "}
                        </p>
                      </div>
                      <div className='flex justify-between items-top'>
                        <div>
                          <p className='font-medium text-sm text-gray-400'>
                            {" "}
                            Billed To{" "}
                          </p>
                          <p>
                            {" "}
                            {orderDetail.firstName} {orderDetail.lastName}
                          </p>
                          <p> {orderDetail.customerEmailId} </p>
                        </div>
                        <div>
                          <div>
                            <p className='font-medium text-sm text-gray-400'>
                              {" "}
                              Invoice Number{" "}
                            </p>
                            <p>
                              {" "}
                              INV-
                              {orderDetail.orderId}{" "}
                            </p>
                          </div>
                          <div className='py-2'>
                            <p className='font-medium text-sm text-gray-400'>
                              {" "}
                              Invoice Date{" "}
                            </p>
                            <p> {orderDetail.orderDate} </p>
                          </div>
                          <div className='py-2'>
                            <p className='font-medium text-sm text-gray-400'>
                              {" "}
                              Payment Method{" "}
                            </p>
                            <p> {orderDetail.paymentMethod} </p>
                          </div>
                          <div className='space-y-4'>
                            <div>
                              <a
                                href='#'
                                target='_blank'
                                className='inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 '
                                onClick={handledownloadPDF}
                              >
                                {" "}
                                Download PDF{" "}
                                <svg
                                  className='ml-0.5 h-4 w-4 fill-current'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                  aria-hidden='true'
                                >
                                  <path d='M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z'></path>
                                  <path d='M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z'></path>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <table className='w-full divide-y divide-gray-200 text-sm'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-9 py-4 text-left font-semibold text-gray-600'
                    >
                      {" "}
                      Products{" "}
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left font-semibold text-gray-600'
                    >
                      {" "}
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left font-semibold text-gray-600'
                    >
                      {" "}
                      Quantity{" "}
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left font-semibold text-gray-600'
                    >
                      {" "}
                      Amount{" "}
                    </th>
                    <th
                      scope='col'
                      className='py-3 text-left font-semibold text-gray-600'
                    ></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-400'>
                  {orderDetail.orderItems?.map((Item) => (
                    <tr key={Item.id}>
                      <td className='px-9 py-5 whitespace-nowrap space-x-1 flex items-center'>
                        <div>
                          <p> {Item.pName} </p>
                        </div>
                      </td>
                      <td className='whitespace-nowrap text-gray-700 truncate'></td>
                      <td className='whitespace-nowrap text-gray-700 truncate pl-4 '>
                        {"  "}
                        {Item.quantity}{" "}
                      </td>
                      <td className='whitespace-nowrap text-gray-700 truncate'>
                        {" "}
                        $ {Item.price.toFixed(2)}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='p-5 border-b border-gray-200'></div>
              <div className='p-5 border-b border-gray-200'>
                <div className='space-y-3'>
                  <div className='flex justify-end'>
                    <div>
                      <p className='font-bold text-black text-lg pr-2'>
                        {" "}
                        Total{" "}
                      </p>
                    </div>
                    <p className='font-bold text-black text-lg pl-2 pr-14'>
                      {" "}
                      ${orderDetail.totalPrice.toFixed(2)}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
export default Order;
