import { useEffect, useState } from "react";

export default function Footer() {

    return (
        <div className="footer">
            <p>
                If you have any questions or ideas on how to improve the site please <a href="https://www.instagram.com/ljpino95/" target="_blank">get in touch!</a>
            </p>
            <p>
                If you would like to help offest webhosting costs consider <a href="https://www.paypal.com/donate/?business=SGHR4W67JPFYA&no_recurring=0&item_name=This+site+costs+%24150+per+year+to+host%2C+help+contribute+to+its+longevity+fund%21&currency_code=CAD" target="_blank">donating! {"<3"}</a>
            </p>
        </div>
    )

}
