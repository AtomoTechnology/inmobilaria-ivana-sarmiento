SELECT * FROM ivanadb.contracts;

select startDate  ,startDate + 30 , DATE_ADD(startDate , interval  30 day) from contracts;
select DATE_ADD(current_date() , interval  30 day) from dual ;
select DATE_ADD(current_date() , interval  1 year) from dual ;

select startDate, DATEDIFF(current_date() , startDate) ,DATEDIFF(current_date() , startDate) + 60 , c.*  
from contracts c
where 
	state = 'En curso' and 
    (
		(DATEDIFF(current_date() , startDate) + 60 between 365 and 730) or 
		(DATEDIFF(current_date() , startDate) + 60 between 731 and 1095)
    )
	
;

SELECT `id`, `PropertyId`, `ClientId`, `startDate`, `endDate`, `state`, `amount`, `booking`, `deposit`, `description`, `createdAt`, `updatedAt`, `deletedAt` 
FROM `contracts` AS `Contract` 
WHERE (`Contract`.`deletedAt` IS NULL AND ((datediff(NOW(), `startDate`) BETWEEN 731 AND 1095) AND `Contract`.`state` = 'En curso'));


