import React, {useState} from 'react';
import {Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import {FaUser, FaUserEdit, FaUserLock} from "react-icons/all";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";

function UsersTable({users, blockUser, ...props}) {
  const [buttonId, setButtonId] = useState(null);
  console.log(users);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 400, maxWidth: '90vw', margin: '8px auto' }}
        size="small"
        aria-label="a dense customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Login</StyledTableCell>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Second Name</StyledTableCell>
            <StyledTableCell align="center">City</StyledTableCell>
            <StyledTableCell align="center">E-mail</StyledTableCell>
            <StyledTableCell align="center">User Role</StyledTableCell>
            <StyledTableCell align="center">Is Block</StyledTableCell>
            <StyledTableCell align="center">Notes</StyledTableCell>
            <StyledTableCell align="center">Creating At</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((User) => (
            <StyledTableRow key={User.id}>
              <StyledTableCell>{User.login}</StyledTableCell>
              <StyledTableCell align="right">{User.first_name}</StyledTableCell>
              <StyledTableCell align="right">{User.secondary_name}</StyledTableCell>
              <StyledTableCell align="right">{User.city}</StyledTableCell>
              <StyledTableCell align="right">{User.email}</StyledTableCell>
              <StyledTableCell align="right">{User.roles.name_eng}</StyledTableCell>
              <StyledTableCell align="right">{User.is_block ? 'Blocked' : ''}</StyledTableCell>
              <StyledTableCell align="right">{User.notes}</StyledTableCell>
              <StyledTableCell align="right">{User.created_at}</StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  to={'/users/' + User.id}
                >
                  <FaUserEdit
                    fontSize="1.5rem"
                    title="Update user"
                  />
                </Link>
                {User.is_block === 1 && (
                  <IconButton
                    onClick={ev => {
                      ev.preventDefault()
                      blockUser(User)
                      setButtonId(User.id);
                    }}
                    component="label"
                    disabled={buttonId && buttonId === User.id}
                  >
                    <FaUserLock
                      fontSize="1.5rem"
                      color="secondary"
                      title="Lock user"
                    />
                  </IconButton>
                )}
                {User.is_block === 0 && (
                  <IconButton
                    onClick={ev => blockUser(User)}
                    component="label"
                    disabled={buttonId && buttonId === User.id}
                  >
                    <FaUser
                      fontSize="1.5rem"
                      color="error"
                      title="Unlock user"
                    />
                  </IconButton>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
