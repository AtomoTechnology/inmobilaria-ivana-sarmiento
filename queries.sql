SELECT * FROM ivanadb.contracts;

select startDate  ,startDate + 30 , DATE_ADD(startDate , interval  30 day) from contracts;
select DATE_ADD(current_date() , interval  30 day) from dual ;
select DATE_ADD(current_date() , interval  1 year) from dual ;
 

SELECT @days := 45;

select startDate, DATEDIFF(current_date() , startDate) , 730 - DATEDIFF(current_date() , startDate)  , c.*  
from contracts c
where 
	state = 'En curso' and 
    (
		(DATEDIFF(current_date() , startDate)  between 365 -@days and 365) or 
        (DATEDIFF(current_date() , startDate)  between 729 - @days and 730) or 
        (DATEDIFF(current_date() , startDate)  between 1095 -@days and 1095) 
    )
	
;


SELECT `id`, `PropertyId`, `ClientId`, `startDate`, `endDate`, `state`, `amount`, `booking`, `deposit`, `description`, `createdAt`, `updatedAt`, `deletedAt` 
FROM `contracts` AS `Contract` 
WHERE (`Contract`.`deletedAt` IS NULL AND ((datediff(NOW(), `startDate`) BETWEEN 731 AND 1095) AND `Contract`.`state` = 'En curso'));


SELECT *  from contracts 
WHERE `deletedAt` IS NULL AND 
(
	datediff(NOW(), `startDate`) BETWEEN 334 AND 365 OR 
	datediff(NOW(), `startDate`) BETWEEN 699 AND 730 OR
	datediff(NOW(), `startDate`) BETWEEN 1064 AND 1095
) 
AND `state` = 'En curso'
 ;


select * from contracts where description = 'CARPETA 136';
select * from properties where id = 39 ;
select * from clients where id = 42 ;

select *  from pricehistorials where ContractId = 13 ;


select DATEDIFF(current_date() , startDate),  Contract.* from `contracts` AS `Contract`  
WHERE 
(`Contract`.`deletedAt` IS NULL AND
 ((datediff(NOW(), `startDate`) BETWEEN 304 AND 365 OR datediff(NOW(), `startDate`) BETWEEN 669 AND 730 OR datediff(NOW(), `startDate`) BETWEEN 1034 AND 1095) 
 AND `Contract`.`state` = 'En curso'));



select * from contracts con 
inner join properties pro 
on con.PropertyId =  pro.id 
where PropertyId in(select id from properties where state = 'Libre')
and con.state = 'En curso'
;

start transaction ; 
update properties set state = 'Ocupado' where id = 39 ;
commit ;



