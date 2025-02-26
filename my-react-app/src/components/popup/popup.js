import './popup.css';
import '../button/button.css';

export default function Popup({content, title}) {

    return (
        <div>
            <button type="button" className="button connection" data-bs-toggle="modal" data-bs-target="#myModal"><b>View Connection</b></button>

            <div className="modal fade" id="myModal" tabIndex={"-1"} aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" data-bs-theme="dark">
                            <h5 className="modal-title" id="myModalLabel">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" dangerouslySetInnerHTML={{__html: content}} />
                    </div>
                </div>
            </div>
        </div>
    )
}