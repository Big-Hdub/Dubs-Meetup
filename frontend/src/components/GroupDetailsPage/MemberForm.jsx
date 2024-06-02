import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMembership, editMembership } from "../../utils/membership";
import * as memberActions from "../../store/members";

const MemberForm = ({ id, auth, groupId }) => {
    const member = useSelector(memberActions.selectMember).entities[id];
    const [stat, setStat] = useState('pending');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setStat(member.Membership.status)
    }, [member, errors])

    const handleState = async (e) => {
        setErrors({});
        try {
            await editMembership(+groupId, { status: e.target.value, memberId: +id }, dispatch)
                .then(setStat(e.target.value))
        } catch (e) {
            let errors = {};
            const data = await e.json();
            if (data.errors) errors = { ...data.errors };
            if (data.message) errors.message = data.message;
            setErrors(errors);
        }
    }

    const deleteMember = async () => {
        setErrors({})
        try {
            await deleteMembership(+id, groupId, dispatch)
        } catch (e) {
            let errors = {};
            const data = await e.json();
            if (data.errors) errors = { ...data.errors };
            if (data.message) errors.message = data.message;
            setErrors(errors);
        }
    }

    return (
        <>
            {(auth === 'Organizer' || auth === 'co-host') ?
                <>
                    {errors.message && <p className="errors">{errors.message}</p>}
                    {errors.status && <p className="errors">{errors.status}</p>}
                    <span className="members-span">
                        <p className="group-details-p">{member.firstName} {member.lastName}</p>
                        <select name={`member:${id}`}
                            className="member-list-select"
                            value={stat}
                            onChange={handleState}>
                            <option value="Organizer">Organizer</option>
                            <option value="co-host">co-host</option>
                            <option value="member">member</option>
                            <option value="pending">pending</option>
                        </select>
                        <button id="member-delete-button" onClick={deleteMember}>Remove member</button>
                    </span >
                </>
                :
                <span className="members-span space-between" style={{ justifyContent: 'space between' }}>
                    <p className="group-details-p" >{member.firstName} {member.lastName}:</p>
                    <p className="group-details-p" >{stat}</p>
                </span>
            }
        </>
    )
}

export default MemberForm;
