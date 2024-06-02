import { useState } from "react";
import { useDispatch } from "react-redux";
import { editMembership } from "../../utils/membership";

const MemberForm = ({ name, status, id, auth, groupId }) => {
    const [stat, setStat] = useState(status);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleState = async (e) => {
        // const errors = {};
        // setErrors(errors);
        // console.log(+groupId, { status: e.target.value, memberId: +id })
        await editMembership(+groupId, { status: e.target.value, memberId: +id }, dispatch)
            .then(setStat(e.target.value))
            .catch(
                async (res) => {
                    const data = await res.json();
                    // console.log("errors:", data)
                    if (data.errors) {
                        setErrors([Object.values(data)])
                    }
                }
            )
    }


    return (<>
        {(auth === 'Organizer' || auth === 'co-host') ?
            <span className="members-span">
                <p className="group-details-p">{name}</p>
                <select name={`member:${id}`}
                    className="member-list-select"
                    value={stat}
                    onChange={handleState}>
                    <option value="Organizer">Organizer</option>
                    <option value="co-host">co-host</option>
                    <option value="member">member</option>
                    <option value="pending">pending</option>
                </select>
                {errors.length > 0 && errors.map(error => {
                    <p className="errors">{error}</p>
                })}
                <button id="member-delete-button">delete</button>
            </span > :
            <span className="members-span space-between" style={{ justifyContent: 'space between' }}>
                <p className="group-details-p" >{name}:</p>
                <p className="group-details-p" >{status}</p>
            </span>
        }
    </>
    )
}

export default MemberForm;
